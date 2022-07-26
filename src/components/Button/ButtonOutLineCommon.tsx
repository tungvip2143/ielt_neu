import React from "react";
//
interface ButtonOutLine {
  children?: string;
}
import ButtonCommon from "./index";
const ButtonOutLineCommon: React.FC<ButtonOutLine> = ({ children }) => {
  const cssButton = {
    padding: "4px 16px",
    borderRadius: "8px",
    color: "rgb(91, 92, 97)",
    border: "1px solid rgb(91, 92, 97)",
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "uppercase",
    // "&:hover": {
    //   background: "rgb(232,234,237)",
    // },
  };
  return <ButtonCommon styleButton={cssButton}>{children}</ButtonCommon>;
};

export default ButtonOutLineCommon;
