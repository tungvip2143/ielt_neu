import { useState } from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
//
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
//
import { makeStyles } from "@mui/styles";

interface QuestionNumberListI {
  questions: any;
  onClickPage: (id: string) => void;
}

const box = {
  width: "200px",
  height: "100vh",
};

const useStyles = makeStyles((theme) => {
  return {
    eachItem: {
      display: "flex",
      paddingBottom: "10px",
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

const QuestionNumberList = ({ questions, onClickPage }: QuestionNumberListI) => {
  console.log("questionSelected", questions);
  const [highlightPage, setHighlightPage] = useState("1");

  //! State
  const classes = useStyles();
  //
  const renderPartValues = (partValues: any, index: number) => {
    console.log("fdsfsdf", partValues);
    let sectionRender: any = {};
    const handleClickQuestion = (part: any, group: any) => {
      sectionRender.part = index;
      onClickPage(sectionRender);
      setHighlightPage(partValues.question.displayNumber);
    };
    const hightLightPage = () => {
      if (highlightPage === partValues.question.displayNumber) {
        return { background: "#4C80F1", borderRadius: "50%" };
      }
    };
    return (
      <>
        <div
          key={partValues.id}
          className={classes.eachQuestion}
          onClick={() => handleClickQuestion(partValues, index)}
          style={hightLightPage()}
          // style={values.answers[]}
        >
          <span>{partValues.question.displayNumber}</span>
        </div>
      </>
    );
  };

  //! Effect

  //! Render
  return (
    <Box sx={box}>
      <Box>
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
                    {renderPartValues(group, index)}
                  </div>
                </>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionNumberList;
