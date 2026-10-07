# Resume Reviewer

Compare a PDF or DOCX resume with a job description and get an evidence-based
skills review. Resume text is extracted on the server and sent to the Gemini
API for analysis; the API key is never sent to the browser.

## Note

This is using a free tier plan on gemini API

## Set up a free Gemini API key

1. Create an API key in [Google AI Studio](https://aistudio.google.com/apikey).
   Gemini API availability and free-tier quotas depend on Google's current
   terms, region, and model limits.
2. Copy `.env.example` to `.env.local` and add your key:

   ```env
   GEMINI_API_KEY=your_google_ai_studio_api_key
   ```

   Keep `.env.local` private. It is ignored by Git. Do not prefix this variable
   with `NEXT_PUBLIC_`.

3. Install packages and start the app:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000), upload a PDF or DOCX
   resume, enter a job description, and submit.

The server uses `gemini-3.5-flash` by default. To use another Gemini model
available to your API key, optionally set `GEMINI_MODEL` in `.env.local`.
Gemini free-tier rate limits can temporarily prevent reviews; the app displays
an error and lets you retry.

## Notes

- Uploads are limited to 10 MB; extracted resume text is limited to 50,000
  characters and job descriptions to 20,000 characters.
- Scanned image-only PDFs are not supported; the PDF must contain selectable
  text.
- Resume contents are sent to Google Gemini to generate the review. Do not
  upload documents unless you are comfortable sharing their text with that
  service.
- The generated review is saved in the current browser tab's session storage
  and is cleared when that tab's session ends.

## Production

Set `GEMINI_API_KEY` as a server-side environment variable in your deployment
provider. Optionally set `GEMINI_MODEL`. Never expose the key in client-side
environment variables or commit it to source control.
