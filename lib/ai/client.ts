import { z } from "zod";

const geminiResponseSchema = z.object({
  candidates: z
    .array(
      z.object({
        content: z
          .object({
            parts: z.array(z.object({ text: z.string().optional() })),
          })
          .optional(),
        finishReason: z.string().optional(),
      }),
    )
    .optional(),
});

export class AIServiceError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "AIServiceError";
  }
}

export async function generateAIResponse(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AIServiceError(
      "The AI service is not configured. Add GEMINI_API_KEY to your .env.local file.",
      503,
    );
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  let response: Response;
  try {
    response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
        signal: controller.signal,
        cache: "no-store",
      },
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new AIServiceError("The AI request timed out. Please try again.", 504);
    }
    throw new AIServiceError(
      "Could not connect to the AI service. Check your connection and try again.",
      502,
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new AIServiceError(
        "Gemini rejected the API key. Check GEMINI_API_KEY in .env.local.",
        502,
      );
    }
    if (response.status === 429) {
      throw new AIServiceError(
        "The Gemini free-tier quota or rate limit has been reached. Please wait and try again.",
        429,
      );
    }
    if (response.status === 503) {
      throw new AIServiceError(
        "Gemini is temporarily busy. Please wait a moment and try again.",
        503,
      );
    }
    throw new AIServiceError(
      `The AI service returned an error (${response.status}). Please try again later.`,
      502,
    );
  }

  let rawResponse: unknown;
  try {
    rawResponse = await response.json();
  } catch {
    throw new AIServiceError(
      "The AI service returned an unreadable response. Please try again.",
      502,
    );
  }
  const parsedResponse = geminiResponseSchema.safeParse(rawResponse);
  const responseText = parsedResponse.data?.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text)
    .find((text): text is string => Boolean(text));

  if (!responseText) {
    throw new AIServiceError(
      "The AI service returned an empty response. Please try again.",
      502,
    );
  }

  return responseText;
}
