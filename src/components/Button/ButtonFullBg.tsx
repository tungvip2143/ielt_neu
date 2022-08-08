import React from "react";
//
interface ButtonFullBg {
  children?: string;
}
import ButtonCommon from "./index";
const ButtonFullBg: React.FC<ButtonFullBg> = ({ children }) => {
  const cssButton = {
    padding: "4px 16px",
    borderRadius: "8px",
    color: "#fff",
    border: "1px solid rgb(11, 34, 131)",
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "uppercase",
    background: "rgb(11, 34, 131)",
    "&:hover": {
      background: "rgb(17,74,198)",
    },
  };
  return <ButtonCommon styleButton={cssButton}>{children}</ButtonCommon>;
};

export default ButtonFullBg;
