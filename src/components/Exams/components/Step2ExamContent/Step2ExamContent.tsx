//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardExercise from "components/Card/CardExercise";
import CardLeft from "components/StepsWorkExercise/Step1/CardLeft";
import TOFFL from "views/TOFFL/index";
//
import { ieltsReadingDataDummy } from "api/ieltsResults";
import CardPart from "components/Card/CardPart";

import CardTotalPageExams from "components/Card/CardTotalPageExams";
import { IELT_TEST } from "interfaces/testType";
import { isEmpty } from "lodash";
import { useMemo, useState } from "react";
import FooterExamResponsive from "./FooterExamResponsive";
//
interface Props {
  data?: any;
}

const Step2ExamContent = (props: any) => {
  const { data, test } = props;
  //! State
  const [questions, setQuestions] = useState(data);

  // const initialQuestion = questions[0]?.groups[0]?.questions[0]?.questionId;
  const [questionSelected, setQuestionSelected] = useState<any>();
  const [groupSelected, setGroupSelected] = useState({
    part: 0,
    group: 0,
    question: 0,
  });
  const [showQuestion, setShowQuestion] = useState("1");
  const [hightLightNumberPage, setHightLightNumberPage] = useState<any>("1");
  const part = data;
  const group = test === IELT_TEST.READING ? data[groupSelected.part]?.groups : [];
  const questionData =
    test === IELT_TEST.READING ? data[groupSelected.part]?.groups[groupSelected.group]?.questions || [] : [];
  const displayNumber = test === IELT_TEST.READING ? questionData[groupSelected.question]?.question?.displayNumber : "";

  console.log("groupSelected", groupSelected);
  console.log("questionData", questionData);
  console.log("displayNumber", displayNumber);

  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
  };

  const onClickPart = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
  };
  const onClickShowQuestion = (displayNumber: any) => {
    setShowQuestion(displayNumber);
  };
  const hightLightNumberPageClickQuestion = (displayNumber: any) => {
    setHightLightNumberPage(displayNumber);
  };
  const partRenderSelected = useMemo(() => {
    const questionsWithPageNumberTemp = (questions as any) || [];
    if (!isEmpty(questionsWithPageNumberTemp[groupSelected?.part])) {
      return questionsWithPageNumberTemp[groupSelected?.part];
    }

    return null;
  }, [ieltsReadingDataDummy, groupSelected]);
  //
  //
  const contentPart = "Sample Academic Reading Multiple Choice (one answer)";
  //! Render
  return (
    <>
      <Box sx={{ margin: "0 15px" }}>
        <CardPart part={groupSelected.part + 1} content={contentPart}></CardPart>
      </Box>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ padding: "0 15px", mt: "15px" }}>
          <Grid
            container
            sx={{
              justifyContent: "space-between",
              display: { xs: "block", lg: "flex" },
            }}
          >
            <CardExercise content={<CardLeft test={test} dataChangePart={partRenderSelected} />} width={5.9} />
            {test === IELT_TEST.READING && (
              <CardExercise
                content={
                  <TOFFL
                    onClickPage={onClickPage}
                    questionSelected={questionSelected}
                    partRenderSelected={group[groupSelected.group]}
                    showQuestion={showQuestion}
                    onHightLightNumberPage={hightLightNumberPageClickQuestion}
                    displayNumber={displayNumber}
                  />
                }
                width={6}
              />
            )}
          </Grid>
        </Box>

        <CardTotalPageExams
          onClickPage={onClickPage}
          questions={questions}
          test={test}
          setDisplayNumber={onClickShowQuestion}
          groupSelected={groupSelected}
          part={part}
          group={group}
          question={questionData}
          displayNumber={displayNumber}
        />
        <FooterExamResponsive />
      </Box>
    </>
  );
};

export default Step2ExamContent;
