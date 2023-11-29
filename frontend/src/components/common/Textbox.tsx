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
  } = props;

  const [style, setStyle] = useState({});
  const [text, setText] = useState(value);

  const onValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
    onChange(value);
  };

  useEffect(() => {
    setStyle({ width, height, fontWeight });
  }, [width, height, fontWeight]);

  return (
    <div className="flex items-center gap-2">
      {label.length > 0 && <span>{label}</span>}
      <input
        type="text"
        className="w-full h-20 border border-slate-400 px-4 py-2 
          text-2xl rounded"
        placeholder={placeholder}
        disabled={disabled}
        style={style}
        value={text}
        onChange={onValueChanged}
      />
    </div>
  );
}
