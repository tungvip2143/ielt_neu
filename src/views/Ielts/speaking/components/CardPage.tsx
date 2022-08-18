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
  onClickPage?: any;
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
  const [highLightPage, setHighLightPage] = useState("1");
  const { questions, onClickPage, displayNumber } = props;
  const renderPartValues = (partValues: any, index: number) => {
    const { values }: any = useFormikContext();
    let sectionRender: any = {};

    return partValues?.groups?.map((partGroup: any, groupIndex: number) => {
      return partGroup.questions.map((item: any, index: number) => {
        console.log("partValues", partValues);

        const handleClickQuestion = (part: any, group: any) => {
          sectionRender.part = partValues.partNumber - 1;
          sectionRender.group = partGroup.groupNumber - 1;
          onClickPage(sectionRender);
          displayNumber(item.question.displayNumber);
          setHighLightPage(item.question.displayNumber);
        };
        const handleHightLightPage = () => {
          if (highLightPage === item.question.displayNumber) {
            return { background: "#4C80F1" };
          }
        };
        return (
          <>
            <Box
              sx={eachQuestion}
              style={handleHightLightPage()}
              key={item.id}
              onClick={() => handleClickQuestion(partValues, partGroup)}
            >
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
          {questions?.data?.data?.map((group: any, index: number) => {
            console.log("partKey", group);
            return (
              <>
                <Box sx={eachItem} key={group.partNumber}>
                  <Box sx={part}>{`Part ${group.partNumber || index + 1}`}</Box>
                  <Stack direction="row" spacing={0.5}>
                    {renderPartValues(group, index)}
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
