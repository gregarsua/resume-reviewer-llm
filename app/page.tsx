"use client"

export default function Home() {

  const submitDetails = () => {
  }

  return (
    <div className="upload-page flex min-h-screen flex-1 items-center justify-center px-5 py-12 font-sans">
      <main className="w-full max-w-xl">
        <header className="mb-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">Resume review</p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#17251e] sm:text-5xl">Upload your resume</h1>
          <p className="mt-3 max-w-md text-base leading-7 text-[#5f6d64]">
            Add your resume to get started with a clear, focused review with AI.
          </p>
        </header>

        <form className="rounded-2xl border border-[#dce6dd] bg-white p-6 shadow-[0_18px_55px_-35px_rgba(23,37,30,0.35)] sm:p-8">
          <label className="mb-3 block text-sm font-semibold text-[#25362c]" htmlFor="file_input">
            Resume file
          </label>
          <input
            className="block w-full cursor-pointer rounded-lg border border-[#d6e1d8] bg-[#f8faf8] text-sm text-[#435248] file:mr-4 file:cursor-pointer file:border-0 file:bg-[#203c2d] file:px-5 file:py-2 file:font-semibold file:text-white hover:file:bg-[#315741] focus:outline-none focus:ring-2 focus:ring-[#73947b] focus:ring-offset-2"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept=".pdf,.doc,.docx"
          />
          <span className="mt-1 text-xs leading-6 text-[#718077]" id="file_input_help">
            PDF or Word document recommended.
          </span>

          <label className="mt-5 mb-3 block text-sm font-semibold text-[#25362c]" htmlFor="file_input">
            Job Description
          </label>
          <textarea className="w-full border border-[#d6e1d8] rounded-lg px-2 py-2 text-[#435248] text-sm" name="" id="" cols={10} rows={10}></textarea>

          <button onClick={submitDetails} className="border bg-[#203c2d] px-2 py-2 rounded-lg w-full text-sm cursor-pointer hover:bg-white hover:text-[#203c2d] hover:border-[#203c2d]">Submit</button>
        </form>
      </main>
    </div>
  );
}
