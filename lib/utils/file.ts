import mammoth from "mammoth";

export const MAX_RESUME_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export class ResumeFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResumeFileError";
  }
}

export async function extractResumeText(file: File): Promise<string> {
  if (file.size === 0) {
    throw new ResumeFileError("The selected resume file is empty.");
  }
  if (file.size > MAX_RESUME_FILE_SIZE_BYTES) {
    throw new ResumeFileError("The resume file must be 10 MB or smaller.");
  }

  const filename = file.name.toLowerCase();
  const buffer = Buffer.from(await file.arrayBuffer());

  if (filename.endsWith(".pdf")) {
    if (!buffer.subarray(0, 1024).includes(Buffer.from("%PDF-"))) {
      throw new ResumeFileError("The selected file is not a valid PDF.");
    }

    await import("pdf-parse/worker");
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    try {
      const parsed = await parser.getText();
      return parsed.text.trim();
    } catch {
      throw new ResumeFileError(
        "The PDF could not be read. Check that it is not encrypted or damaged.",
      );
    } finally {
      await parser.destroy();
    }
  }

  if (filename.endsWith(".docx")) {
    try {
      const parsed = await mammoth.extractRawText({ buffer });
      return parsed.value.trim();
    } catch {
      throw new ResumeFileError(
        "The Word document could not be read. Upload a valid .docx file.",
      );
    }
  }

  throw new ResumeFileError("Upload a PDF or .docx resume.");
}
