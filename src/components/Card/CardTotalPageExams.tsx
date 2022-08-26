import { useState, useEffect } from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//
import { makeStyles } from "@mui/styles";
import { useFormikContext } from "formik";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
//
import ImgHideTotalPage from "assets/image/exam/hide-total-page.png";
import NextQuestion from "assets/image/exam/next-exercise.png";
import PrevQuestion from "assets/image/exam/prev-exercise.png";

interface CardTotalPageExamsI {
  questions?: any;
  onClickPage?: any;
  setDisplayNumber?: any;
  test?: any;
  groupSelected?: any;
  part?: any;
  group?: any;
  question?: any;
  displayNumber: number;
}

const box = {
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  width: "80%",
  display: { xs: "none", lg: "block" },
  borderRadius: "8px 8px 0 0",
  border: "1px solid #fff",
  background: themeCssSx.backgroundExam.content,
};
const TotalPage = {
  display: "flex",
  width: "100%",
  position: "fixed",
  bottom: { xs: "0", lg: "0px" },
  margin: "0 15px",
};
const containerTotalPage = {
  ...themeCssSx.flexBox.flexBetweenCenter,
  p: "5px 10px",
};
const useStyles = makeStyles((theme) => {
  return {
    eachItem: {
      display: "flex",
    },
    eachQuestion: {
      background: "#000",
      color: "#fff",
      width: "23px",
      height: "23px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
      borderRadius: "2px",
    },
  };
});
const nextPage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  transform: "rotate(180deg)",
  cursor: "pointer",
  boxShadow:
    "rgba(0, 0, 0, 0.03) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.03) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.03) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.02) 0px 2px 1px, rgba(0, 0, 0, 0.01) 0px 4px 2px, rgba(0, 0, 0, 0.01) 0px 8px 4px, rgba(0, 0, 0, 0.01) 0px 16px 8px, rgba(0, 0, 0, 0.01) 0px 32px 16px",
};

const containerNextPage = {
  display: "flex",
  justifyContent: "flex-end",
  width: "13%",
};

const didExercise = {
  background: "#90caf9 ",
  borderRadius: "2px",
  position: "relative",
  "&::affter": {
    position: "absolute",
    display: "block",
    content: "fsdfdsf",
    bottom: "10px",
    width: "100%",
    height: "1px",
    background: "#333",
  },
};

export enum Direction {
  next = "next",
  back = "back",
}

const CardTotalPageExams = ({
  questions,
  onClickPage,
  setDisplayNumber,
  groupSelected,
  part,
  group,
  question,
  displayNumber,
}: CardTotalPageExamsI) => {
  const [showPageReview, setShowPageReview] = useState<string>();
  const [checkedReview, setCheckedReview] = useState(false);
  const { handleSubmit } = useFormikContext();

  useEffect(() => {
    const hanldeHighLightReview = () => {
      if (checkedReview) {
        return setShowPageReview("show-page-review");
      }
      return setShowPageReview("hide-review");
    };
    hanldeHighLightReview();
  }, [checkedReview]);
  //! State
  const classes = useStyles();
  //

  const handleCheckBox = (event: any) => {
    setCheckedReview(event.target.checked);
  };
  //
  const hideReview = () => {
    setCheckedReview(false);
  };
  // ! Next  question
  const checkNextPartRender = () => {
    let sectionRender: any = {};
    let partLength = part.length - 1;
    let groupLength = group.length - 1;
    let questionLength = question.length - 1;
    //
    if (groupSelected.question < questionLength) {
      sectionRender.question = groupSelected.question + 1;
      return sectionRender;
    }
    if (groupSelected.group < groupLength) {
      sectionRender.group = groupSelected.group + 1;
      sectionRender.question = 0;
      return sectionRender;
    }
    if (groupSelected.part < partLength) {
      sectionRender.part = groupSelected.part + 1;
      sectionRender.group = 0;
      sectionRender.question = 0;
      return sectionRender;
    }
    handleSubmit();
    return;
  };

  const checkBackRenderQuestion = () => {
    let sectionRender: any = {};

    if (groupSelected.question > 0) {
      sectionRender.question = groupSelected.question - 1;
      return sectionRender;
    }
    if (groupSelected.group > 0) {
      let questiongLength = questions[groupSelected.part]?.groups[groupSelected.group - 1]?.questions.length - 1;
      sectionRender.group = groupSelected.group - 1;
      sectionRender.question = questiongLength;
      return sectionRender;
    }

    if (groupSelected.part > 0) {
      let groupLength = questions[groupSelected.part - 1]?.groups?.length - 1;
      let questiongLength = questions[groupSelected.part - 1]?.groups[groupLength]?.questions.length - 1;

      sectionRender.part = groupSelected.part - 1;
      sectionRender.group = groupLength;
      sectionRender.question = questiongLength;
      return sectionRender;
    }

    return;
  };

  const onClickNextQuestion = () => {
    const sectionRender = checkNextPartRender();
    setDisplayNumber(displayNumber);
    onClickPage(sectionRender);
  };

  const onClickBackQuestion = () => {
    const sectionRender = checkBackRenderQuestion();
    onClickPage(sectionRender);
    setDisplayNumber(displayNumber);
  };

  const handleClickQuestion = (partIndex: number, groupIndex: number, questionIndex: number) => {
    const sectionRender: any = {};
    sectionRender.part = partIndex;
    sectionRender.group = groupIndex;
    sectionRender.question = questionIndex;
    hideReview();
    onClickPage(sectionRender);
  };

  const renderPartValues = (partValues: any, partIndex: number) => {
    const { values }: any = useFormikContext();
    let sectionRender: any = {};
    //
    return partValues?.groups?.map((group: any, groupIndex: number) => {
      return group.questions.map((question: any, questionIndex: number) => {
        const add = Number(question.question.displayNumber) - 1;

        const highLightPage = () => {
          if (displayNumber == question.question.displayNumber) {
            return "high-light-page";
          }
          return classes.eachQuestion;
        };

        const didExerciseActive = () => {
          if (values?.answers[`${add}`]?.studentAnswer) {
            return "did-exercise";
          }
        };
        return (
          <>
            <Box
              key={question.id}
              className={`${highLightPage()} ${
                displayNumber === question.question.displayNumber && showPageReview
              } ${`${didExerciseActive()}-abc`}`}
              onClick={() => handleClickQuestion(partIndex, groupIndex, questionIndex)}
            >
              <span className={didExerciseActive()}>{question.question.displayNumber}</span>
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
      <Box className="quang-test" sx={TotalPage}>
        <Box>
          <FormControlLabel
            value=""
            control={<Checkbox checked={checkedReview} onChange={handleCheckBox} />}
            label="Review"
          />
        </Box>
        <Box sx={box}>
          <Box sx={containerTotalPage}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {questions?.map((group: any, index: number) => {
                return (
                  <>
                    <div key={group.partNumber} className={classes.eachItem}>
                      <Stack direction="row" spacing={0.2} className="part-item">
                        {renderPartValues(group, index)}
                      </Stack>
                    </div>
                  </>
                );
              })}

              <Box sx={{ width: { md: "20%" } }}></Box>
            </Box>
            <img src={ImgHideTotalPage} alt="" />
          </Box>
        </Box>
        <Stack direction="row" spacing={2} sx={containerNextPage}>
          <Box sx={nextPage} onClick={onClickBackQuestion}>
            <img src={NextQuestion} alt="" />
          </Box>
          <Box sx={nextPage} onClick={onClickNextQuestion}>
            <img src={PrevQuestion} alt="" />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default CardTotalPageExams;
