import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TextSubCard {
  children: string;
}

const TextSubCard: React.FC<TextSubCard> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "16px" },
    color: "#36373B",
    fontWeight: 500,
    // pb: "32px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TextSubCard;
