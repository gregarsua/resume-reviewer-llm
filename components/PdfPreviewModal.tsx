"use client";

import { useEffect } from "react";

type PdfPreviewModalProps = {
  isOpen: boolean;
  fileName: string;
  previewUrl: string;
  onClose: () => void;
};

export default function PdfPreviewModal({
  isOpen,
  fileName,
  previewUrl,
  onClose,
}: PdfPreviewModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !previewUrl) {
    return null;
  }

  return (
    <div
      aria-label="Resume PDF preview"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17251e]/70 p-4 sm:p-8"
      role="dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#dce6dd] bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-[#e8eee9] px-5 py-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#25362c]">
              {fileName}
            </p>
            <p className="mt-0.5 text-xs text-[#718077]">PDF preview</p>
          </div>
          <button
            aria-label="Close PDF preview"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#dce6dd] text-lg leading-none text-[#435248] hover:bg-[#f3f7f3]"
            onClick={onClose}
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <iframe
          className="h-[78vh] w-full bg-[#edf1ee]"
          src={previewUrl}
          title={`Preview of ${fileName}`}
        />
      </div>
    </div>
  );
}
