import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      <h2 className="text-base font-medium text-gray-900 mb-1">
        Đã xảy ra lỗi
      </h2>
      <span className="inline-block text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-1.5 mt-1">
        {message}
      </span>
    </div>
  );
}
