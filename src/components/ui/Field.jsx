import { useId, useState } from "react";
import Icon from "./Icon";

const baseInput =
  "w-full h-11 px-3.5 bg-surface border rounded-md text-[0.9375rem] text-fg placeholder:text-fg-4 outline-none transition-colors focus:border-fg-3 focus:bg-bg";

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
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-fg-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`${baseInput} ${error ? "border-danger" : "border-line-strong"} ${isPassword ? "pr-11" : ""} ${inputClassName}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded text-fg-3 transition-colors hover:text-fg"
            aria-label={show ? "Hide password" : "Show password"}
          >
            <Icon name={show ? "eyeOff" : "eye"} size={17} />
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-2 text-xs text-fg-3">
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
          <label htmlFor={id} className="block text-sm font-medium text-fg-2">
            {label}
          </label>
          {maxLength && (
            <span className="font-mono text-2xs text-fg-3 tabular">
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
        className={`${baseInput} h-auto min-h-[9rem] py-3 resize-y leading-6 ${error ? "border-danger" : "border-line-strong"}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-danger">
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
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-fg-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select id={id} className={`${baseInput} appearance-none pr-10 ${error ? "border-danger" : "border-line-strong"}`} {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fg-3 pointer-events-none" />
      </div>
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
    </div>
  );
};

export const Checkbox = ({ label, error, className = "", id: idProp, ...props }) => {
  const autoId = useId();
  const id = idProp || autoId;

  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-start gap-3 text-sm text-fg-2 cursor-pointer">
        <input id={id} type="checkbox" className="peer sr-only" aria-invalid={!!error} {...props} />
        <span className="flex items-center justify-center w-[1.125rem] h-[1.125rem] mt-0.5 shrink-0 rounded-sm border border-line-strong bg-surface text-transparent transition-colors peer-checked:bg-accent peer-checked:border-accent peer-checked:text-accent-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
          <Icon name="check" size={13} strokeWidth={3} />
        </span>
        <span>{label}</span>
      </label>
      {error && <p className="mt-2 ml-8 text-xs text-danger">{error}</p>}
    </div>
  );
};
