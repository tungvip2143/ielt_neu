import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TitleSecond {
  children: string;
}

const TitleSecond: React.FC<TitleSecond> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "20px", sm: "32px" },
    color: "#000000",
    fontWeight: 700,
    pb: "12px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TitleSecond;
