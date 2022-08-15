import React, { useEffect } from "react"; //
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
import { IELT_TEST } from "interfaces/testType";
import Writing from "./components/Writing";
import CardPart from "components/Card/CardPart";
import ReactHtmlParser from "react-html-parser";
import QuestionNumberList from "./components/QuestionNumberList";
import { useSelector } from "react-redux";
import { useGetWritingResultByTestCode } from "hooks/review/useIeltsReview";
import { makeStyles } from "@mui/styles";
import LoadingPage from "components/Loading";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 16px",
    display: "flex",
    flexDirection: "column",
  },
}));

interface Props {
  data?: any;
}

const WritingReview = (props: any) => {
  //! State
  const classes = useStyles();
  const { data } = props;

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(data);
  }, []);

  const [questionSelected, setQuestionSelected] = useState<any>("1");
  const [groupSelected, setGroupSelected] = useState({
    part: 0,
    group: 0,
  });
  const [showQuestion, setShowQuestion] = useState();
  const [hightLightNumberPage, setHightLightNumberPage] = useState<any>();

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
  }, [questions, groupSelected]);
  //
  console.log("partRenderSelected11", partRenderSelected);

  //! Render
  return (
    <div className={classes.root}>
      <Box>
        <CardPart part={groupSelected.part + 1}>
          {/* {ReactHtmlParser(partRenderSelected?.groups[groupSelected.group]?.directionText)} */}
        </CardPart>
      </Box>
      <Box sx={{ display: "flex", flex: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Grid container sx={{ justifyContent: "space-between", p: "20px 0" }}>
            {/* <CardExercise content={<CardLeft dataChangePart={partRenderSelected} />} /> */}
            <CardExercise content={<Writing partRenderSelected={partRenderSelected} groupSelected={groupSelected} />} />
          </Grid>
        </Box>
      </Box>
      <QuestionNumberList
        questionSelected={questionSelected}
        onClickPart={onClickPart}
        onClickPage={onClickPage}
        questions={questions}
        setDisplayNumber={onClickShowQuestion}
        hightLightNumberPage={hightLightNumberPage}
        onClickPageNumber={hightLightNumberPageClickQuestion}
      />
    </div>
  );
};

const WritingReviewContainer = () => {
  //   const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const param = useParams();
  const { testCode }: any = param;
  const { data, isLoading } = useGetWritingResultByTestCode(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <WritingReview data={data?.data?.data?.writing} />;
};

export default WritingReviewContainer;
