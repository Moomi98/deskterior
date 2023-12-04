import { ChangeEvent, useEffect, useState } from "react";

interface TextboxProps {
  onChange: Function;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  fontWeight?: string | number;
  label?: string;
  type?: "text" | "number";
  limit?: number;
}

export default function Textbox(props: TextboxProps) {
  const {
    onChange,
    value = "",
    disabled = false,
    placeholder = "",
    width = "100%",
    height = "32px",
    fontWeight = 500,
    label = "",
    type = "text",
    limit,
  } = props;

  const [style, setStyle] = useState({});
  const [text, setText] = useState(value);
  const [focus, setFocus] = useState(false);

  const onValueChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (limit && value.length > limit) return;

    setText(value);
    onChange(value);
  };

  useEffect(() => {
    setStyle({ width, height, fontWeight });
  }, [width, height, fontWeight]);

  return (
    <div
      className={`flex items-center gap-2 rounded border ${
        focus ? "border-slate-600" : "border-slate-400"
      }`}
    >
      {label.length > 0 && <span>{label}</span>}
      <input
        type={type}
        className="w-full h-20 px-4 py-2"
        placeholder={placeholder}
        disabled={disabled}
        style={style}
        value={text}
        onChange={onValueChanged}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {limit && (
        <div className="flex gap-1 text-slate-400 px-4 py-2">
          <span>{text.length}</span>
          <span>/</span>
          <span>{limit}</span>
        </div>
      )}
    </div>
  );
}
