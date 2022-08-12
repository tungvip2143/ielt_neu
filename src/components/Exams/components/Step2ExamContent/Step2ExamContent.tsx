import React, { useEffect } from "react";
import { dataLeft } from "./DataLeftChangePart";
//
import Box from "@mui/material/Box";
import CardExercise from "components/Card/CardExercise";
import CardLeft from "components/StepsWorkExercise/Step1/CardLeft";
import TOFFL from "views/TOFFL/index";
import Grid from "@mui/material/Grid";
//
import CardTotalPageExams from "components/Card/CardTotalPageExams";
import { useState } from "react";
import { dataDummy, ieltsReadingDataDummy } from "api/ieltsResults";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { group } from "console";
import { ACTION, IELT_TEST } from "interfaces/testType";
import Writing from "views/Ielts/writing/component/Writing";
import CardPart from "components/Card/CardPart";
import ReactHtmlParser from "react-html-parser";
import QuestionNumberList from "components/Review/Components/QuestionNumberList";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  test: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    gap: 16,
  },
}));

interface Props {
  data?: any;
}

const Step2ExamContent = (props: any) => {
  //! State
  const classes = useStyles();
  const { data, test, action } = props;
  const [questions, setQuestions] = useState(data);
  console.log("step2 data", data);

  // const initialQuestion = questions[0]?.groups[0]?.questions[0]?.questionId;
  const [questionSelected, setQuestionSelected] = useState<any>("1");
  const [groupSelected, setGroupSelected] = useState({
    part: 0,
    group: 0,
  });
  const [showQuestion, setShowQuestion] = useState();
  const [hightLightNumberPage, setHightLightNumberPage] = useState<any>();

  console.log("hightLightNumberPage", hightLightNumberPage);

  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
    console.log("groupRenderSelected", groupRenderSelected);
  };

  const onClickPart = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
    console.log("part", groupRenderSelected);
  };
  const onClickShowQuestion = (displayNumber: any) => {
    setShowQuestion(displayNumber);
  };
  const hightLightNumberPageClickQuestion = (displayNumber: any) => {
    setHightLightNumberPage(displayNumber);
  };
  const partRenderSelected = useMemo(() => {
    console.log("group select", groupSelected);
    const questionsWithPageNumberTemp = questions as any;
    if (!isEmpty(questionsWithPageNumberTemp[groupSelected?.part])) {
      return questionsWithPageNumberTemp[groupSelected?.part];
    }

    return null;
  }, [ieltsReadingDataDummy, groupSelected]);
  //
  console.log("partRenderSelected11", partRenderSelected);
  //! Render
  return (
    <div className={classes.container}>
      {action === ACTION.TEST && (
        <Box sx={{ margin: "0 auto" }}>
          <CardPart part={groupSelected.part + 1}>
            {/* {ReactHtmlParser(partRenderSelected?.groups[groupSelected.group]?.directionText)} */}
          </CardPart>
        </Box>
      )}
      <Box sx={{ position: "relative" }}>
        <Box sx={{ margin: "0 auto" }}>
          <Grid container sx={{ justifyContent: "space-between", p: "20px 0" }}>
            {action === ACTION.REVIEW && (
              <CardTotalPageExams
                questionSelected={questionSelected}
                onClickPart={onClickPart}
                onClickPage={onClickPage}
                questions={questions}
                test={test}
                setDisplayNumber={onClickShowQuestion}
                hightLightNumberPage={hightLightNumberPage}
                onClickPageNumber={hightLightNumberPageClickQuestion}
                action={ACTION.REVIEW}
              />
            )}
            <div className={classes.test}>
              <CardExercise content={<CardLeft test={test} dataChangePart={partRenderSelected} />} />
              {test === IELT_TEST.WRITING && (
                <CardExercise
                  content={<Writing questionId={partRenderSelected?.questionId} groupSelected={groupSelected} />}
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
                      action={action}
                    />
                  }
                />
              )}
            </div>
          </Grid>
        </Box>

        {action === ACTION.TEST && (
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
        )}
      </Box>
    </div>
  );
};

export default Step2ExamContent;
