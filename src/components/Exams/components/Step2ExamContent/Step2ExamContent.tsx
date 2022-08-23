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
import Writing from "views/Ielts/writing/component/Writing";
import FooterExamResponsive from "./FooterExamResponsive";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
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
  });
  const [showQuestion, setShowQuestion] = useState("1");
  const [hightLightNumberPage, setHightLightNumberPage] = useState<any>("1");

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
    const questionsWithPageNumberTemp = (questions as any) || {};
    if (!isEmpty(questionsWithPageNumberTemp[groupSelected?.part])) {
      return questionsWithPageNumberTemp[groupSelected?.part];
    }

    return null;
  }, [ieltsReadingDataDummy, groupSelected]);
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
            {test === IELT_TEST.WRITING && (
              <CardExercise
                content={<Writing questionId={partRenderSelected?.questionId} groupSelected={groupSelected} />}
                width={6}
              />
            )}
            {test === IELT_TEST.READING && (
              <CardExercise
                content={
                  <TOFFL
                    onClickPage={onClickPage}
                    questionSelected={questionSelected}
                    partRenderSelected={partRenderSelected?.groups[groupSelected.group]}
                    showQuestion={showQuestion}
                    onHightLightNumberPage={hightLightNumberPageClickQuestion}
                  />
                }
                width={6}
              />
            )}
          </Grid>
        </Box>

        <CardTotalPageExams
          questionSelected={questionSelected}
          onClickPart={onClickPart}
          onClickPage={onClickPage}
          questions={questions}
          test={test}
          setDisplayNumber={onClickShowQuestion}
          hightLightNumberPage={hightLightNumberPage}
          onClickPageNumber={hightLightNumberPageClickQuestion}
        />
        <FooterExamResponsive />
      </Box>
    </>
  );
};

export default Step2ExamContent;
