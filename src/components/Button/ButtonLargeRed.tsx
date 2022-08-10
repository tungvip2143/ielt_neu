import React from "react";
//
interface ButtonFullBg {
  children?: string;
}
import ButtonCommon from "./index";
const ButtonLargeRed: React.FC<ButtonFullBg> = ({ children }) => {
  const cssButton = {
    // padding: "12px 60px",
    width: "48%",
    borderRadius: "12px",
    color: "#fff",
    border: "1px solid rgb(246,71,90)",
    fontWeight: 700,
    fontSize: "16px",
    textTransform: "uppercase",
    background: "rgb(246,71,90)",
    "&:hover": {
      backgroundColor: "#fff",
      background: "rgb(223,10,49)",
    },
  };
  return <ButtonCommon styleButton={cssButton}>{children}</ButtonCommon>;
};

export default ButtonLargeRed;
