import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface Title {
  children: string;
}

const Title: React.FC<Title> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: "36px",
    color: "#000000",
    fontWeight: 700,
    pb: "36px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default Title;
