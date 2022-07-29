import React from "react";
//
interface ButtonFullBg {
  children?: string;
}
import ButtonCommon from "./index";
const ButtonLarge: React.FC<ButtonFullBg> = ({ children }) => {
  const cssButton = {
    // padding: "12px 60px",
    width: "48%",
    borderRadius: "12px",
    color: "#fff",
    border: "1px solid rgb(76,128,241)",
    fontWeight: 700,
    fontSize: "16px",
    textTransform: "uppercase",
    background: "rgb(76,128,241)",
    marginRight: "10px",
    "&:hover": {
      backgroundColor: "#fff",
      background: "rgb(17,74,198)",
    },
  };
  return <ButtonCommon styleButton={cssButton}>{children}</ButtonCommon>;
};

export default ButtonLarge;
