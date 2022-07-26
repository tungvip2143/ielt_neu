import React, { ReactNode } from "react";
import Button from "@mui/material/Button";

interface ButtonI {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;

  styleButton?: {
    padding?: string;
    borderRadius?: string;
    color?: string;
    border?: string;
    fontWeight?: number;
    fontSize?: string;
    textTransform?: string;
    background?: string;
  };
  onChange?: React.FormEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}
// const styleButton = {
//   p:"4px 16px",
//   border:"1px solid #ccc",

// }

const ButtonCommon: React.FC<ButtonI> = ({
  type = "button",
  children,
  className,
  styleButton,
  onChange,
  onClick,
  onKeyDown,
}) => {
  return (
    <Button
      sx={{ ...styleButton }}
      type={type}
      className={className}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onChange={onChange}
    >
      {children}
    </Button>
  );
};
export default ButtonCommon;
