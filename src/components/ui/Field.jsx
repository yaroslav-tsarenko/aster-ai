import { useId, useState } from "react";
import Icon from "./Icon";

const baseInput =
  "w-full h-12 px-4 bg-n-7 border rounded-xl text-n-1 placeholder:text-n-4 outline-none transition-colors focus:border-color-1 focus:bg-n-8";

export const TextField = ({
  label,
  error,
  hint,
  type = "text",
  className = "",
  inputClassName = "",
  id: idProp,
  ...props
}) => {
  const autoId = useId();
  const id = idProp || autoId;
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm text-n-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`${baseInput} ${error ? "border-color-3" : "border-n-6"} ${
            isPassword ? "pr-12" : ""
          } ${inputClassName}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-n-4 transition-colors hover:text-n-1"
            aria-label={show ? "Hide password" : "Show password"}
          >
            <Icon name={show ? "eyeOff" : "eye"} size={18} />
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-color-3">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-2 text-xs text-n-4">
            {hint}
          </p>
        )
      )}
    </div>
  );
};

export const TextArea = ({ label, error, className = "", id: idProp, maxLength, value = "", ...props }) => {
  const autoId = useId();
  const id = idProp || autoId;

  return (
    <div className={className}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={id} className="block text-sm text-n-2">
            {label}
          </label>
          {maxLength && (
            <span className="text-xs text-n-4 tabular-nums">
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      )}
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseInput} h-auto min-h-[9rem] py-3 resize-y ${
          error ? "border-color-3" : "border-n-6"
        }`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-color-3">
          {error}
        </p>
      )}
    </div>
  );
};

export const SelectField = ({ label, error, options, className = "", id: idProp, ...props }) => {
  const autoId = useId();
  const id = idProp || autoId;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm text-n-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`${baseInput} appearance-none pr-10 ${error ? "border-color-3" : "border-n-6"}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-n-4 pointer-events-none"
        />
      </div>
      {error && <p className="mt-2 text-xs text-color-3">{error}</p>}
    </div>
  );
};

export const Checkbox = ({ label, error, className = "", id: idProp, ...props }) => {
  const autoId = useId();
  const id = idProp || autoId;

  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-start gap-3 text-sm text-n-3 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          aria-invalid={!!error}
          {...props}
        />
        <span className="flex items-center justify-center w-5 h-5 mt-0.5 shrink-0 rounded-md border border-n-5 bg-n-7 text-transparent transition-colors peer-checked:bg-color-1 peer-checked:border-color-1 peer-checked:text-n-1 peer-focus-visible:ring-2 peer-focus-visible:ring-color-1">
          <Icon name="check" size={14} strokeWidth={3} />
        </span>
        <span>{label}</span>
      </label>
      {error && <p className="mt-2 ml-8 text-xs text-color-3">{error}</p>}
    </div>
  );
};
