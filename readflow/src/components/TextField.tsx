import { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextField({ label, id, ...inputProps }: TextFieldProps) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-800 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        {...inputProps}
        className="w-full rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400
                   focus:outline-none focus:ring-2 focus:ring-flow-500/30 focus:border-flow-500 transition-colors"
      />
    </div>
  );
}
