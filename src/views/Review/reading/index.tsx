import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardExercise from "components/Card/CardExercise";
import CardLeft from "components/StepsWorkExercise/Step1/CardLeft";
import TOFFL from "views/TOFFL/index";
//
import { ieltsReadingDataDummy } from "api/ieltsResults";
import CardPart from "components/Card/CardPart";
import CardTotalPageExams from "components/Card/CardTotalPageExams";
import { useGetReadingResultByTestCode } from "hooks/review/useIeltsReview";
import { IELT_TEST } from "interfaces/testType";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import QuestionNumberList from "./components/QuestionNumberList";
import QuestionAnswer from "./components/QuestionAnswer";
import { makeStyles } from "@mui/styles";
import LoadingPage from "components/Loading";
import { useParams } from "react-router-dom";
//
import Header from "../Header/Header";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  exam: {
    display: "flex",
    flex: 1,
  },
}));

interface Props {
  data?: any;
}

const ReadingReview = (props: any) => {
  //! State
  const classes = useStyles();
  const { data } = props;
  console.log("data789", data);
  const [questions, setQuestions] = useState([]);

  const [questionSelected, setQuestionSelected] = useState<any>("1");
  const [groupSelected, setGroupSelected] = useState({
    part: 0,
    group: 0,
  });
  const [showQuestion, setShowQuestion] = useState([]);
  const [hightLightNumberPage, setHightLightNumberPage] = useState<any>();
  console.log("questions", questions);

  useEffect(() => {
    setQuestions(data);
  }, []);

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
    console.log("questions select", questions);
    const questionsWithPageNumberTemp = questions as any;
    if (!isEmpty(questionsWithPageNumberTemp)) {
      return questionsWithPageNumberTemp[groupSelected?.part];
    }

    return null;
  }, [questions, groupSelected]);

  //

  console.log("partRenderSelected11", partRenderSelected);
  //! Render
  const container = {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
  };
  const content = {
    p: "0 16px",
    maxWidth: "1440px",
    margin: "16px auto 0 auto",
  };
  return (
    <Formik initialValues={{}} onSubmit={() => console.log("hello")}>
      {(formik: any) => (
        <Form className={classes.form}>
          <Box sx={container}>
            <Header />
            <Box sx={content}>
              <Box>
                <CardPart part={groupSelected.part + 1}>
                  {/* {ReactHtmlParser(partRenderSelected?.groups[groupSelected.group]?.directionText)} */}
                </CardPart>
              </Box>
              <Box className={classes.exam}>
                <Grid container sx={{ justifyContent: "space-between", p: "20px 0" }}>
                  <CardExercise content={<CardLeft test={IELT_TEST.READING} dataChangePart={partRenderSelected} />} />
                  <CardExercise
                    content={
                      <QuestionAnswer
                        onClickPage={onClickPage}
                        questionSelected={questionSelected}
                        partRenderSelected={partRenderSelected?.groups[groupSelected.group]}
                        showQuestion={showQuestion}
                        onHightLightNumberPage={hightLightNumberPageClickQuestion}
                      />
                    }
                  />
                </Grid>
              </Box>
            </Box>
            <QuestionNumberList
              questionSelected={questionSelected}
              onClickPart={onClickPart}
              onClickPage={onClickPage}
              questions={questions}
              test={IELT_TEST.READING}
              setDisplayNumber={onClickShowQuestion}
              hightLightNumberPage={hightLightNumberPage}
              onClickPageNumber={hightLightNumberPageClickQuestion}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const ReadingReviewContainer = () => {
  const param = useParams();
  const { testCode }: any = param;
  const { data, isLoading } = useGetReadingResultByTestCode(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <ReadingReview data={data?.data?.data?.reading} />;
};

export default ReadingReviewContainer;
