import React from "react";
//
import Box from "@mui/material/Box";
import Text from "components/Typography/index";
// ! type
interface Data {
  data: {
    title: string;
    desc: string;
    color?: string;
  };
}

const TitleSection = ({ data }: Data) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Text.TitleIntroPage sx={{ pb: "5px", color: data.color }}>{data.title}</Text.TitleIntroPage>
      <Text.DescNormal>{data.desc}</Text.DescNormal>
    </Box>
  );
};

export default TitleSection;
