import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TextSmallMedium {
  children: string;
}

const TextSmallMedium: React.FC<TextSmallMedium> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: "16px",
    color: "rgb(17, 74, 198)",
    fontWeight: 500,
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TextSmallMedium;
