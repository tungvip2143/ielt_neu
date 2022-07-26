import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TextMediumLarge {
  children: string;
}

const TextMediumLarge: React.FC<TextMediumLarge> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "18px", lg: "24px" },
    color: "rgb(54, 55, 59)",
    fontWeight: 700,
    pb: "12px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TextMediumLarge;
