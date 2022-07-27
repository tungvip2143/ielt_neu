import React from "react";
//
interface ButtonStartTest {
  children?: string;
}
import ButtonCommon from "./index";
const ButtonStartTest: React.FC<ButtonStartTest> = ({ children }) => {
  const cssButton = {
    padding: "10px 0px",
    width: "70%",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: 700,
    fontSize: "18px",
    textTransform: "uppercase",
    background: "#333",
    "&:hover": {
      background: "#333",
    },
  };
  return <ButtonCommon styleButton={cssButton}>{children}</ButtonCommon>;
};

export default ButtonStartTest;
