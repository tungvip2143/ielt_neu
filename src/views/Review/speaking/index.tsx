import React, { useEffect } from "react"; //
import Box from "@mui/material/Box";
import CardExercise from "components/Card/CardExercise";
import CardLeft from "components/StepsWorkExercise/Step1/CardLeft";
import TOFFL from "views/TOFFL/index";
import Grid from "@mui/material/Grid";
//
import { useState } from "react";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import Writing from "../writng/components/Writing";
import QuestionNumberList from "../writng/components/QuestionNumberList";
import { useGetSpeakingResultByTestCode } from "hooks/review/useIeltsReview";
import { makeStyles } from "@mui/styles";
import LoadingPage from "components/Loading";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import ContentRight from "../writng/components/ContentRight";
import ModalImage from "../../../components/Modal/ModalImage";
import ModalRightAnswer from "../writng/components/ContentRight";
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

const SpeakingReview = (props: any) => {
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

  const [groupSelected, setGroupSelected] = useState({
    part: 0,
    group: 0,
  });

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
        {isOpenAnswer && <ModalRightAnswer />}
        {/* chua co ham */}
        {open && <ModalImage image={image} handleClose={handleClose} />}
      </Box>
    </div>
  );
};

const SpeakingReviewContainer = () => {
  //   const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const param = useParams();
  const { testCode }: any = param;
  const { data, isLoading } = useGetSpeakingResultByTestCode(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <SpeakingReview data={data?.data?.data?.writing} />;
};

export default SpeakingReviewContainer;
