import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface DescSmall {
  children: string;
}

const DescSmall: React.FC<DescSmall> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "16px", lg: "18px" },
    color: "#A09FA4",
    fontWeight: 300,
    // pb: "32px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default DescSmall;
