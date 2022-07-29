import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface Desc16 {
  children: string;
}

const Desc16: React.FC<Desc16> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "16px" },
    color: "#5B5C61",
    fontWeight: 300,
    // pb: "48px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default Desc16;
