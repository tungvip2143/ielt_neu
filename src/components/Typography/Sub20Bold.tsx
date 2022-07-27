import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface Sub20Bold {
  children: string;
}

const Sub20Bold: React.FC<Sub20Bold> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "18px", md: "20px" },
    color: "#8A8C91",
    fontWeight: 700,
    // pb: "16px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default Sub20Bold;
