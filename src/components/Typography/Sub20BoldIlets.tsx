import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface Sub20BoldIlets {
  children: string;
}

const Sub20BoldIlets: React.FC<Sub20BoldIlets> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "16px", sm: "20px" },
    color: "#36373B",
    fontWeight: 700,
    // pb: "20px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default Sub20BoldIlets;
