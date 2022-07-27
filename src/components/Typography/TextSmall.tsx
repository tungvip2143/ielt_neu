import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TextSmall {
  children: string;
}

const TextSmall: React.FC<TextSmall> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "16px" },
    color: "#606166",
    fontWeight: 300,
    // pb: "16px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TextSmall;
