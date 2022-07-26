import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface TextTitleCard {
  children: string;
}

const TextTitleCard: React.FC<TextTitleCard> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "24px", lg: "24px" },
    color: "#36373B",
    fontWeight: 700,
    // pb: "32px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default TextTitleCard;
