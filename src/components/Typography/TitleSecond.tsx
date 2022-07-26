import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TitleSecond {
  children: string;
}

const TitleSecond: React.FC<TitleSecond> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "22px", lg: "32px" },
    color: "#000000",
    fontWeight: 700,
    pb: "32px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TitleSecond;
