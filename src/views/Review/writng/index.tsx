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
import Header from "../Header/Header";
import ContentRight from "./components/ContentRight";
import ModalImage from "../../../components/Modal/ModalImage";
import ModalRightAnswer from "./components/ModalRightAnswer";
import Score from "../reading/components/Score";
//

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

interface Props {
  data?: any;
}

const WritingReview = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [isOpenAnswer, setIsModalAnswer] = useState(false);
  const [contentModal, setContentModal] = useState();

  console.log("isOpenAnswer", isOpenAnswer);

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
  const { displayNumber, image, modelAnswer, organization, questionNumber, tips, usefulGrammarNVocab } =
    partRenderSelected?.question || {};
  console.log("partRenderSelected", partRenderSelected);
  //
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenAnswer = () => setIsModalAnswer(true);
  const handleCloseAnswer = () => setIsModalAnswer(false);
  //
  const handleSetContentModal = (content: any) => {
    setContentModal(content);
  };
  const container = {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
  };
  const content = {};
  const navLeft = {
    background: "#fff",
    p: "40px 16px",
    boxShadow: "rgba(0, 0, 0, 0.10) 0px 5px 15px",
  };
  //! Render
  return (
    <div className={classes.root}>
      <Box sx={container}>
        <Header />
        <Box sx={content}>
          <Box>
            <Box sx={{ display: "flex", flex: 1 }}>
              <Box sx={navLeft}>
                <Score titleExam="Writing" />
                <QuestionNumberList onClickPage={onClickPage} questions={questions} />
              </Box>
              <Grid container sx={{ justifyContent: "space-between", p: "40px 20px", width: "calc(100vw - 200px)" }}>
                <CardExercise
                  width={7}
                  content={<Writing partRenderSelected={partRenderSelected} groupSelected={groupSelected} />}
                />
                <ContentRight
                  apiContent={partRenderSelected}
                  handleOpen={handleOpen}
                  handleOpenAnswer={handleOpenAnswer}
                  handleSetContentModal={handleSetContentModal}
                />
              </Grid>
            </Box>
          </Box>
        </Box>
        {isOpenAnswer && <ModalRightAnswer handleCloseAnswer={handleCloseAnswer} content={contentModal} />}
        {open && <ModalImage image={image} handleClose={handleClose} />}
      </Box>
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
