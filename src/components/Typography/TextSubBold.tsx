import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TextSubBold {
  children: string;
}

const TextSubBold: React.FC<TextSubBold> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "18px" },
    color: "rgb(17, 17, 20)",
    fontWeight: 700,
    pb: "10px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TextSubBold;
