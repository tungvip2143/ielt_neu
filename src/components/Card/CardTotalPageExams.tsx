import { useState } from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
//
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//
import { makeStyles } from "@mui/styles";
import { useFormikContext } from "formik";
import { ACTION, IELT_TEST } from "interfaces/testType";
import ButtonCommon from "components/Button/ButtonCommon";
import Text from "components/Typography";
import { dataTotalNumber } from "components/data/dataNumberPageExam";

interface CardTotalPageExamsI {
  questions: any;
  onClickPage: (id: string) => void;
  onClickPart: (id: string) => void;
  setDisplayNumber?: any;
  questionSelected?: string;
  hightLightNumberPage: any;
  test?: string;
  onClickPageNumber: (id: string) => void;
  action?: string;
}

const box = {
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  transform: "translateY(-100px)",
  p: "10px 0px",
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      // padding: "0 16px",
    },
    header: {
      padding: "13px 16px",
      background: "#36373b",
      width: "100%",
      display: "flex",
      gap: 16,
      alignItems: "center",
    },
    navLeft: {
      width: "180px",
      padding: "40px 16px",
      background: "#f0f9ff",
      height: `calc(100vh - 63px)`,
    },
    content: {
      padding: "0 16px",
    },
    eachItem: {
      display: "flex",
      paddingBottom: "10px",
    },
    part: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#000000",
      marginRight: "15px",
      textTransform: "capitalize",
    },
    eachQuestion: {
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
    },
  };
});
const nextPage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#333",
  p: "8px",
  borderRadius: "5px",
};
const CardTotalPageExams = ({
  questions,
  onClickPart,
  onClickPage,
  test,
  setDisplayNumber,
  hightLightNumberPage,
  onClickPageNumber,
  action = ACTION.TEST,
}: CardTotalPageExamsI) => {
  // console.log("questionSelected", questionSelected);
  const [highlightPage, setHighlightPage] = useState();

  //! State
  const classes = useStyles();
  const { values }: any = useFormikContext();
  //
  const renderPartValues = (partValues: any, index: number) => {
    let sectionRender: any = {};
    if (test === IELT_TEST.WRITING) {
      const handleClickQuestion = (part: any, group: any) => {
        sectionRender.part = index;
        onClickPage(sectionRender);
        setHighlightPage(partValues.questionId);
      };
      return (
        <>
          <div
            key={partValues.id}
            className={classes.eachQuestion}
            onClick={() => handleClickQuestion(partValues, index)}
            style={highlightPage === partValues.questionId ? { background: "#4C80F1", borderRadius: "50%" } : {}}
            // style={values.answers[]}
          >
            <span>{partValues.question.displayNumber}</span>
          </div>
        </>
      );
    }

    return partValues?.groups?.map((partGroup: any, groupIndex: number) => {
      return partGroup.questions.map((item: any, index: number) => {
        const handleClickQuestion = (part: any, group: any) => {
          sectionRender.part = partValues.partNumber - 1;
          sectionRender.group = partGroup.groupNumber - 1;
          onClickPage(sectionRender);
          onClickPageNumber(item?.question?.displayNumber);
          setDisplayNumber(item?.question?.displayNumber);
        };
        const add = Number(item.question.displayNumber) - 1;

        const hightLightNumberPageOnclickQuestion = () => {
          if (hightLightNumberPage == item?.question?.displayNumber) {
            return { background: "#4C80F1", borderRadius: "50%" };
          }
          // else if (values?.answers[`${add}`]?.studentAnswer) {
          //   return { background: "#90caf9", borderRadius: "50%" };
          // }
        };
        return (
          <>
            <Box
              key={item.id}
              className={classes.eachQuestion}
              onClick={() => handleClickQuestion(partValues, partGroup)}
              style={hightLightNumberPageOnclickQuestion()}
            >
              <span>{item?.question?.displayNumber}</span>
            </Box>
          </>
        );
      });
    });
  };
  //! Effect

  //! Render
  return (
    <>
      {action === ACTION.TEST && (
        <Box sx={box}>
          <Box sx={{ width: "80%", margin: "0 auto" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <Box sx={{ width: { md: "80%", display: "flex", flexWrap: "wrap", gap: 8 } }}>
                {questions?.map((group: any, index: number) => {
                  console.log("partKey", group);
                  // console.log("partValues", partValues);
                  // console.log("questions12", Object.entries(questions));
                  return (
                    <>
                      <div
                        key={group.partNumber}
                        className={classes.eachItem}
                        // onClick={() => onClickPart(group.partNumber)}
                      >
                        <div className={classes.part}>{`Part ${group.partNumber || index + 1}`}</div>
                        <Stack direction="row" spacing={0.5}>
                          {renderPartValues(group, index)}
                        </Stack>
                      </div>
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
      )}
      {action === ACTION.REVIEW && (
        <div className={classes.container}>
          <Box className={classes.navLeft}>
            <ButtonCommon.ButtonFullBg
              sx={{
                background: "#E8EAED",
                color: "#000000",
                width: "100%",
                p: "6px !important",
                "&:hover": { background: "#E8EAED" },
              }}
            >
              Score : 0/9
            </ButtonCommon.ButtonFullBg>
            <Stack direction="row" sx={{ justifyContent: "space-between", m: "32px 0 24px 0" }}>
              <Text.DescSmall sx={{ color: "#111114", fontSize: "12px", fontWeight: "bold" }}>Reading</Text.DescSmall>
              <KeyboardArrowUpIcon />
            </Stack>
            <Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
              {questions?.map((group: any, index: number) => {
                return (
                  <>{renderPartValues(group, index)}</>
                  // <ButtonCommon.ButtonNumber
                  //   sx={{
                  //     background: "#E8EAED",
                  //     width: "24px !important",
                  //     height: "24px",
                  //     minWidth: "0 !important",
                  //     p: "0 !important",
                  //     mt: "5px",
                  //     borderRadius: "0 !important",
                  //     fontSize: "12px !important",
                  //     color: "#D7000D !important",
                  //     fontWeight: "300 !important",
                  //     "&:hover": {
                  //       background: "#E8EAED",
                  //     },
                  //   }}
                  // >
                  //   {item.number}
                  // </ButtonCommon.ButtonNumber>
                );
              })}
            </Stack>
          </Box>
        </div>
      )}
    </>
  );
};

export default CardTotalPageExams;
