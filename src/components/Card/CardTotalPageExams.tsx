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
import { useCheckRenderQuestion } from "hooks/ielts/useCheckRenderQuestion";
import CacheService from "services/cacheService";

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
      background: theme.custom?.background.pageNumber,
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
  // const [showPageReview, setShowPageReview] = useState<string>();
  // const [checkedReview, setCheckedReview] = useState(false);
  const [inReviewListQuestions, setInReviewListQuestions] = useState<number[]>(
    CacheService.getDataCache()?.inReviewList || []
  );

  const { handleSubmit } = useFormikContext();
  const { checkBackRenderQuestion, checkNextPartRender } = useCheckRenderQuestion({
    question,
    part,
    group,
    questions,
    groupSelected,
    handleSubmit,
  });

  // useEffect(() => {
  //   const hanldeHighLightReview = () => {
  //     if (checkedReview) {
  //       return setShowPageReview("show-page-review");
  //     }
  //     return setShowPageReview("hide-review");
  //   };
  //   hanldeHighLightReview();
  // }, [checkedReview]);
  useEffect(() => {
    CacheService.cache("inReviewList", inReviewListQuestions);
  }, [inReviewListQuestions]);
  //! State
  const classes = useStyles();
  //

  // const handleCheckBox = (event: any) => {
  //   setCheckedReview(event.target.checked);
  // };
  const handleCheckBox = (event: any) => {
    setInReviewListQuestions((prev: number[]) => {
      if (inReviewListQuestions.includes(displayNumber)) {
        const index = inReviewListQuestions.findIndex((i) => i === displayNumber);
        return inReviewListQuestions.slice(0, index).concat(inReviewListQuestions.slice(index + 1));
      }
      return inReviewListQuestions.concat(displayNumber);
    });
  };
  //
  // const hideReview = () => {
  //   setCheckedReview(false);
  // };

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
    // hideReview();

    onClickPage(sectionRender);
  };

  const renderPartValues = (partValues: any, partIndex: number) => {
    const { values }: any = useFormikContext();
    let sectionRender: any = {};

    console.log("partValues cardtotal", partValues?.groups);
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
            {/* <Box
              key={question.id}
              className={`${highLightPage()} ${
                displayNumber === question.question.displayNumber && showPageReview
              } ${`${didExerciseActive()}-abc`}`}
              onClick={() => handleClickQuestion(partIndex, groupIndex, questionIndex)}
            >
              <span className={didExerciseActive()}>{question.question.displayNumber}</span>
            </Box> */}
            <Box
              key={question.id}
              className={`${highLightPage()} ${
                inReviewListQuestions.includes(question.question.displayNumber) ? "show-page-review" : "hide-review"
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
            // control={<Checkbox checked={checkedReview} onChange={handleCheckBox} />}
            control={<Checkbox checked={inReviewListQuestions.includes(displayNumber)} onChange={handleCheckBox} />}
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
