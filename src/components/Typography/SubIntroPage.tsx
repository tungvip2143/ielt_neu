import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface SubIntroPage {
  children: string;
}

const SubIntroPage: React.FC<SubIntroPage> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "16px", lg: "20px" },
    color: "#36373B",
    fontWeight: 300,
    pb: "30px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default SubIntroPage;
