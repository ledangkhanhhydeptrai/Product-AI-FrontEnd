import React from "react";

interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  text = "Loading..."
}) => {
  const content = (
    <div className="flex items-center gap-2.5 text-slate-600">
      <span className="relative w-4.5 h-4.5 shrink-0">
        <span className="absolute inset-0 rounded-full border-2 border-slate-200" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin" />
      </span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );

  if (!fullScreen) return content;

  return (
    <div className="fixed inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="px-5 py-4 rounded-xl bg-white shadow-[0_8px_30px_-8px_rgba(15,23,42,0.18)] border border-slate-100">
        {content}
      </div>
    </div>
  );
};

export default Loading;
