import React from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// ! type
interface Props {
  dataQuestions?: any;
  onClickPage?: any;
}
const box = {
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  position: "fixed",
  bottom: { xs: "0", lg: "0px" },
  width: "100%",
  p: "10px 0px",
  display: { xs: "none", lg: "block" },
};
const nextPage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#333",
  p: "8px",
  borderRadius: "5px",
};
const eachTeam = {
  display: "flex",
  paddingBottom: "10px",
};
const part = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#000000",
  marginRight: "15px",
  textTransform: "capitalize",
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
const CardPage = ({ dataQuestions, onClickPage }: Props) => {
  const [highlightPage, setHighlightPage] = React.useState();
  console.log("dataListening", dataQuestions);
  const renderPartValues = (partValues: any, index: number) => {
    // const { values }: any = useFormikContext();
    let sectionRender: any = {};

    return partValues?.groups?.map((partGroup: any, groupIndex: number) => {
      return partGroup.questions.map((item: any, index: number) => {
        const handleClickQuestion = (part: any, group: any) => {
          sectionRender.part = partValues.partNumber - 1;
          sectionRender.group = partGroup.groupNumber - 1;
          onClickPage(sectionRender);
          setHighlightPage(item.question.displayNumber);
        };

        return (
          <>
            <Box
              key={item.id}
              style={
                highlightPage === item.question.displayNumber ? { background: "#4C80F1", borderRadius: "50%" } : {}
              }
              sx={eachQuestion}
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
      <Box sx={{ width: "95%", margin: "0 auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ width: { md: "80%", display: "flex", flexWrap: "wrap", gap: 8 } }}>
            {dataQuestions?.data?.data.map((group: any, index: number) => {
              console.log("partKey", group);
              // console.log("partValues", partValues);
              // console.log("questions12", Object.entries(questions));
              return (
                <>
                  <Box key={group.partNumber} sx={eachTeam}>
                    <Box sx={part}>{`Part ${group.partNumber || index + 1}`}</Box>
                    <Stack direction="row" spacing={0.5}>
                      {renderPartValues(group, index)}
                    </Stack>
                  </Box>
                </>
              );
            })}
          </Box>

          <Box sx={{ width: { md: "20%" } }}>
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end" }}>
              <Box sx={nextPage}>
                <KeyboardArrowLeftIcon sx={{ color: "#fff", fontSize: "24px" }} />
              </Box>
              <Box sx={nextPage}>
                <KeyboardArrowRightIcon sx={{ color: "#fff", fontSize: "24px" }} />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardPage;
