import React, { useState, useMemo, useEffect } from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import CardNumberPage from "./CardNumberPage";
//
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
//
import { makeStyles } from "@mui/styles";
import { IELT_TEST } from "interfaces/testType";

interface CardTotalPageExamsI {
  questions: any;
  onClickPage: (id: string) => void;
  onClickPart: (id: string) => void;
  setDisplayNumber?: any;
  questionSelected?: string;
  hightLightNumberPage: any;
  test?: string;
  onClickPageNumber: (id: string) => void;
}

const box = {
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  transform: "translateY(-100px)",
  p: "10px 0px",
};

const useStyles = makeStyles((theme) => {
  return {
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
}: CardTotalPageExamsI) => {
  // console.log("questionSelected", questionSelected);
  console.log("questions", questions);

  const [highlightPage, setHighlightPage] = useState();

  //! State
  const classes = useStyles();

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
          onClickPageNumber(item.question.displayNumber);
          setDisplayNumber(item.question.displayNumber);
        };

        const hightLightNumberPageOnclickQuestion = () => {
          if (hightLightNumberPage == item.question.displayNumber) {
            return { background: "#4C80F1", borderRadius: "50%" };
          }
        };
        return (
          <>
            <div
              key={item.id}
              className={classes.eachQuestion}
              onClick={() => handleClickQuestion(partValues, partGroup)}
              style={hightLightNumberPageOnclickQuestion()}
            >
              <span>{item.question.displayNumber}</span>
            </div>
          </>
        );
      });
    });
  };
  //! Effect

  //! Render
  return (
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
  );
};

export default CardTotalPageExams;
