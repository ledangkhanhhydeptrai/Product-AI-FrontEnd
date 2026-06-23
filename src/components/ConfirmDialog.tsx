import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Confirm action",
  description = "Are you sure you want to continue?",
  onCancel,
  onConfirm
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-[fadeIn_0.15s_ease-out]"
      onClick={onCancel}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.96) translateY(4px) } to { opacity: 1; transform: scale(1) translateY(0) } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-2xl shadow-[0_8px_30px_-8px_rgba(15,23,42,0.25)] border border-slate-100 overflow-hidden animate-[popIn_0.18s_ease-out]"
      >
        <div className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-rose-500"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <div className="space-y-1">
            <h2 className="text-base font-semibold text-slate-800">{title}</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 px-6 py-4 bg-slate-50/70 border-t border-slate-100">
          <button
            onClick={onCancel}
            className="px-4 h-9 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 bg-white transition hover:bg-slate-50 active:scale-[0.97]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 h-9 text-sm font-semibold rounded-lg bg-rose-600 text-white shadow-sm shadow-rose-200 transition hover:bg-rose-700 active:scale-[0.97]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
