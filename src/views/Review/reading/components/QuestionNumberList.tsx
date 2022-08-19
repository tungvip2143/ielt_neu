import { useState } from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//
import { makeStyles } from "@mui/styles";
import { useFormikContext } from "formik";
import { IELT_TEST } from "interfaces/testType";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";

interface QuestionNumberListI {
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
  width: "200px",
  height: "100vh",
};

const useStyles = makeStyles((theme) => {
  return {
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

const QuestionNumberList = ({
  questions,
  onClickPart,
  onClickPage,
  test,
  setDisplayNumber,
  hightLightNumberPage,
  onClickPageNumber,
}: QuestionNumberListI) => {
  // console.log("showAnswerTrue", showAnswerTrue);
  const [highlightPage, setHighlightPage] = useState();

  //! State
  const classes = useStyles();
  const { values }: any = useFormikContext();
  //
  const renderPartValues = (partValues: any, index: number) => {
    let sectionRender: any = {};
    return partValues?.groups?.map((partGroup: any, groupIndex: number) => {
      return partGroup.questions.map((item: any, index: number) => {
        const handleClickQuestion = (part: any, group: any) => {
          sectionRender.part = partValues.partNumber - 1;
          sectionRender.group = partGroup.groupNumber - 1;
          onClickPage(sectionRender);
          onClickPageNumber(item.question.displayNumber);
          setDisplayNumber(item.question.displayNumber);
        };
        const hightLightTrueAnswer = () => {
          return item?.studentAnswer?.toUpperCase() === item?.question?.answer;
        };
        console.log("absabdjb", hightLightTrueAnswer());

        const hightLightNumberPageOnclickQuestion = () => {
          if (hightLightNumberPage == item.question.displayNumber) {
            return { background: "#4C80F1", borderRadius: "50%" };
          }
          if (hightLightTrueAnswer()) {
            return { background: themeCssSx.colorAnswer.correctAnswer, borderRadius: "50%" };
          }
          if (hightLightTrueAnswer() === false) {
            return { background: themeCssSx.colorAnswer.inCorrectAnswer, borderRadius: "50%" };
          }
        };
        // const highLightAnswer = () => {
        //   if {
        //     return { background: themeCssSx.colorAnswer.inCorrectAnswer, borderRadius: "50%" };
        //   }
        // };
        return (
          <>
            <Box
              key={item.id}
              className={classes.eachQuestion}
              onClick={() => handleClickQuestion(partValues, partGroup)}
              style={hightLightNumberPageOnclickQuestion()}
              // sx={highLightAnswer()}
            >
              <span>{item.question.displayNumber}</span>
            </Box>
          </>
        );
      });
    });
  };
  //! Effect

  //! Render
  return (
    <Box sx={box}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ width: { md: "100%", display: "flex", flexWrap: "wrap", gap: 4 } }}>
            {questions?.map((group: any, index: number) => {
              console.log("partKey", group);

              return <>{renderPartValues(group, index)}</>;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionNumberList;
