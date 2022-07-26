import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface DescMedium {
  children: string;
}

const DescMedium: React.FC<DescMedium> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "18px" },
    color: "#36373B",
    fontWeight: 500,
    // pb: "16px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default DescMedium;
