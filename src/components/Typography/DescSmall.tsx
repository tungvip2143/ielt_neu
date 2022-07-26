import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface DescSmall {
  children: string;
}

const DescSmall: React.FC<DescSmall> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: "14px",
    color: "#A09FA4",
    fontWeight: 300,
    maxWidth: "224px",
    // pb: "32px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default DescSmall;
