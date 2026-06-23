import React, { useId } from "react";

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text"
}) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
      />
    </div>
  );
};

export default Input;
