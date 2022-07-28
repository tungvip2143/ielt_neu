import React from "react";
//
import Typography from "@mui/material/Typography";
//! type
interface Typographys {
  children?: string;
  styleTypography?: {
    fontSize?: object;
    color?: string;
    fontWeight?: number;
    paddingBottom?: string;
  };
}
const TypographyCommon: React.FC<Typographys> = ({ children, styleTypography }) => {
  //! Render
  return <Typography sx={{ ...styleTypography }}>{children}</Typography>;
};

const Title : React.FC =(props)=>{

  return <Typography></Typography>
}

export default TypographyCommon;
