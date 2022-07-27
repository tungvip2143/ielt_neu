import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface DescNormal {
  children: string;
}

const DescNormal: React.FC<DescNormal> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "18px" },
    color: "#36373B",
    fontWeight: 300,
    pb: "20px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default DescNormal;
