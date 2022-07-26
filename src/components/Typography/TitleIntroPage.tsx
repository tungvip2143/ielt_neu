import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TitleIntroPage {
  children: string;
}

const TitleIntroPage: React.FC<TitleIntroPage> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "24px", lg: "48px" },
    color: "#000000",
    fontWeight: 700,
    pb: "30px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TitleIntroPage;
