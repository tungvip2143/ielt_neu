import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TextMedium {
  children: string;
}

const TextMedium: React.FC<TextMedium> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: "18px",
    color: "#606166",
    fontWeight: 300,
    pb: "48px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TextMedium;
