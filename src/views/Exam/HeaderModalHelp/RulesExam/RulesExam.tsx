import React from "react";
import IntructionsToCandidates from "views/components/dataSteps/DataContentReading/IntructionsToCandidates";
import InformationForCandidates from "views/components/dataSteps/DataContentReading/InformationForCandidates";
import Text from "components/Typography/index";
import { Box } from "@mui/material";

const RulesExam = () => {
  const textTitle = {
    fontWeight: 700,
  };
  const styleListRule = {
    marginLeft: "16px !important",
  };
  return (
    <>
      <Box sx={{ margin: "25px 0 50px 0" }}>
        <Text.DescMedium sx={textTitle}>INSTRUCTIONS TO CANDIDATES</Text.DescMedium>
        <IntructionsToCandidates styleListRule={styleListRule} />
        <Text.DescMedium sx={textTitle}>INFORMATION FOR CANDIDATES</Text.DescMedium>
        <InformationForCandidates styleListRule={styleListRule} />
      </Box>
    </>
  );
};

export default RulesExam;
