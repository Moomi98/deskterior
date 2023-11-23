import { MouseEventHandler } from "react";
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
}

export default function Button(props: ButtonProps) {
  const { text, value, preset = "primary", icon, onButtonClicked } = props;

  const iconSize = 20;

  const iconPreset = {
    add: <BiPlus size={iconSize} />,
    regist: <MdCreate size={iconSize} />,
    delete: <MdOutlineDelete size={iconSize} />,
    cancel: <MdCancel size={iconSize} />,
  };

  return (
    <button
      className={`${styles.container} ${styles[preset]}`}
      onClick={() => onButtonClicked && onButtonClicked(value)}
    >
      {props.icon && iconPreset[props.icon]}
      <span>{text}</span>
    </button>
  );
}
