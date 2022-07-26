import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TextMediumBold {
  children: string;
}

const TextMediumBold: React.FC<TextMediumBold> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: "18px",
    color: "rgb(17, 17, 20)",
    fontWeight: 700,
    pb: "48px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TextMediumBold;
