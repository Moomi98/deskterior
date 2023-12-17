import { MouseEventHandler, useEffect } from "react";
import styles from "@/src/components/common/Button.module.css";
import { BiPlus } from "react-icons/bi";
import { MdCreate, MdOutlineDelete, MdCancel } from "react-icons/md";

type ButtonPreset = "primary" | "normal";
type IconPreset = "add" | "regist" | "delete" | "cancel";
interface ButtonProps {
  text: string;
  value?: string | number | boolean;
  preset?: ButtonPreset;
  icon?: IconPreset;
  onButtonClicked?: Function;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    text,
    value,
    preset = "primary",
    icon,
    onButtonClicked,
    disabled,
  } = props;

  const iconSize = 20;

  const iconPreset = {
    add: <BiPlus size={iconSize} />,
    regist: <MdCreate size={iconSize} />,
    delete: <MdOutlineDelete size={iconSize} />,
    cancel: <MdCancel size={iconSize} />,
  };

  return (
    <button
      className={`${styles.container} ${styles[preset]} ${
        disabled && styles.disabled
      }`}
      onClick={() => onButtonClicked && onButtonClicked(value)}
      disabled={disabled}
    >
      {icon && iconPreset[icon]}
      <span>{text}</span>
    </button>
  );
}
