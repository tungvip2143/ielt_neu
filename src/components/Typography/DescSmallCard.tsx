import React from "react";
import TypographyCommon from "./TypographyCommon";

//! type
interface DescSmallCard {
  children: string;
}

const DescSmallCard: React.FC<DescSmallCard> = ({ children }) => {
  //! State
  const styleText = {
    fontSize: { xs: "16px" },
    color: "#36373B",
    fontWeight: 300,
    // pb: "16px",
  };
  //! Render
  return <TypographyCommon styleTypography={styleText}>{children}</TypographyCommon>;
};

export default DescSmallCard;
