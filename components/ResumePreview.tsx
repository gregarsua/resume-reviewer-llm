"use client";

import { useEffect, useState } from "react";

type ResumePreviewProps = {
  file: File | null;
  isLoading: boolean;
};

export default function ResumePreview({
  file,
  isLoading,
}: ResumePreviewProps) {
  const [preview, setPreview] = useState<{ file: File | null; url: string }>({
    file: null,
    url: "",
  });
  const previewUrl = preview.file === file ? preview.url : "";

  useEffect(() => {
    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    const frame = window.requestAnimationFrame(() =>
      setPreview({ file, url }),
    );
    return () => {
      window.cancelAnimationFrame(frame);
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <section
      aria-labelledby="resume-preview-heading"
      className="overflow-hidden rounded-2xl border border-[#dce6dd] bg-white"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#e8eee9] px-5 py-4">
        <div className="min-w-0">
          <h2
            className="text-base font-semibold text-[#17251e]"
            id="resume-preview-heading"
          >
            Resume preview
          </h2>
          {file && (
            <p className="mt-1 truncate text-xs text-[#718077]">{file.name}</p>
          )}
        </div>
        {previewUrl && (
          <a
            className="shrink-0 text-xs font-semibold text-[#315741] hover:text-[#203c2d]"
            download={file?.name}
            href={previewUrl}
          >
            Download
          </a>
        )}
      </div>

      {isLoading ? (
        <div className="grid h-96 place-items-center px-5 text-sm text-[#718077]">
          Loading preview...
        </div>
      ) : previewUrl ? (
        <iframe
          className="h-[42rem] w-full bg-[#edf1ee]"
          src={previewUrl}
          title={`Resume preview for ${file?.name ?? "uploaded resume"}`}
        />
      ) : (
        <div className="grid h-96 place-items-center px-6 text-center">
          <div>
            <p className="text-sm font-semibold text-[#25362c]">
              PDF preview unavailable
            </p>
            <p className="mt-2 max-w-xs text-xs leading-5 text-[#718077]">
              This is available for PDF uploads. DOCX resumes can still be
              reviewed normally.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
