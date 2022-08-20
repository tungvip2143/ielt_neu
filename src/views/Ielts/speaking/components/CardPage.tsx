import { useState } from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import { useFormikContext } from "formik";

import { IELT_TEST } from "interfaces/testType";
// !type
interface Props {
  questions?: any;
  displayNumber?: any;
}

const box = {
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  position: "fixed",
  bottom: { xs: "0", lg: "0px" },
  width: "100%",
  p: "30px 0px",
  display: { xs: "none", lg: "block" },
};
const eachItem = {
  display: "flex",
  mr: "20px",
};
const eachQuestion = {
  background: "#333",
  color: "#fff",
  width: "24px",
  height: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "bold",
  cursor: "pointer",
};
const part = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#000000",
  marginRight: "15px",
  textTransform: "capitalize",
};
const container = {
  width: "90%",
  maxWidth: "1440px",
  margin: "0 auto",
  justifyContent: "space-between",
};
const CardPage = (props: Props) => {
  const { questions, displayNumber } = props;
  let questionIndex = 0;
  const renderPartValues = (partValues: any) => {
    return partValues?.groups?.map((partGroup: any) => {
      return partGroup.questions.map((item: any) => {
        questionIndex++;
        let hightLight = {};
        if (displayNumber >= questionIndex) {
          hightLight = { background: "#4C80F1" };
        }
        return (
          <>
            <Box sx={eachQuestion} style={hightLight} key={item.id}>
              <span>{item.question.displayNumber}</span>
            </Box>
          </>
        );
      });
    });
  };
  return (
    <Box sx={box}>
      <Box sx={container}>
        <Box sx={eachItem}>
          {questions?.map((group: any, index: number) => {
            console.log("partKey", group);
            return (
              <>
                <Box sx={eachItem} key={group.partNumber}>
                  <Box sx={part}>{`Part ${group.partNumber || index + 1}`}</Box>
                  <Stack direction="row" spacing={0.5}>
                    {renderPartValues(group)}
                  </Stack>
                </Box>
              </>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default CardPage;
