type InputProps = {
  placeholder: string;
  type?: string;
  name?: string;
  maxLength?: number;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  name,
  value,
  onChange,
  maxLength,
}) => {
  return (
    <label className=" relative block rounded-2xl border border-white shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
      <input
        onChange={(e) => {
          e.preventDefault();

          if (maxLength && e.target.value.length > maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
          }
          if (onChange) {
            onChange(e);
          }
        }}
        type={type || "text"}
        name={name || "input"}
        maxLength={maxLength}
        value={value || ""}
        className="peer w-full lg:text-xl py-2 px-4 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={placeholder}
      />

      <span className=" pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-slate-950 p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {placeholder}
      </span>
    </label>
  );
};

export default Input;
