import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TextSteps {
  children: string;
}

const TextSteps: React.FC<TextSteps> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "18px" },
    color: "#0B2283",
    fontWeight: 500,
    pb: "20px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TextSteps;
