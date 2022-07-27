import React from "react";
//
interface ButtonNumberPage {
  children?: string;
}
import ButtonCommon from "./index";
const ButtonNumberPage: React.FC<ButtonNumberPage> = ({ children }) => {
  const cssButton = {
    borderRadius: "5px",
    color: "#fff",
    fontWeight: 700,
    fontSize: "12px",
    textTransform: "uppercase",
    background: "#333",
    width: "24px",
    height: "20px",
    minWidth: "unset",
    p: "0",
    mr: "3px",
    "&:hover": {
      background: "#333",
    },
  };
  return <ButtonCommon styleButton={cssButton}>{children}</ButtonCommon>;
};

export default ButtonNumberPage;
