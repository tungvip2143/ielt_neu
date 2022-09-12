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
import { useEffect, useMemo, useState } from "react";
import FooterExamResponsive from "./FooterExamResponsive";
import { useGetTestCode } from "hooks/ielts/useGetTestCodeHook";
import { useIeltsReading } from "hooks/ielts/useIelts";
import { useHistory } from "react-router-dom";
import LoadingPage from "components/Loading";
import { useFormikContext } from "formik";
import cacheService from "services/cacheService";
import { useConfirmCloseBrowser } from "hooks/ielts/useCloseTagConfirmHook";
import { useHightLightText } from "hooks/ielts/useHightLightTextScannerHook";
import CommonStyles from "components/CommonStyles";
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
  const [text, setText] = useState("");
  const [groupSelected, setGroupSelected] = useState({
    part: 0,
    group: 0,
    question: 0,
  });
  const [showQuestion, setShowQuestion] = useState("1");
  const [questionType, setQuestionType] = useState();

  const [hightLightNumberPage, setHightLightNumberPage] = useState<any>("1");
  const part = data;
  const group = data[groupSelected.part]?.groups;
  const questionData = data[groupSelected.part]?.groups[groupSelected.group]?.questions || [];
  const displayNumber = questionData[groupSelected.question]?.question?.displayNumber;
  const { values, setFieldValue } = useFormikContext();
  const {
    onScannerText,
    onHightlight,
    passageTextWithHighlightTexted,
    position,
    isOpenOptionClear,
    onCloseNote,
    onClearHightLightAll,
    onClickNote,
    onClearHightLight,
    isNoted,
    isHightLight,
    onInputChange,
  } = useHightLightText({ text, values, onChangeInput: setFieldValue, tagName: "DIV" });

  useEffect(() => {
    cacheService.cache("answers", values);
  }, [values]);

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

  const onClickQuestionType = (questionType: any) => {
    setQuestionType(questionType);
  };

  const getTextEachPart = (text: string) => {
    setText(text);
  };

  const partRenderSelected = useMemo(() => {
    const questionsWithPageNumberTemp = (questions as any) || [];
    if (!isEmpty(questionsWithPageNumberTemp[groupSelected?.part])) {
      return questionsWithPageNumberTemp[groupSelected?.part];
    }

    return null;
  }, [ieltsReadingDataDummy, groupSelected]);
  //
  const styleAddExercise = {
    height: "calc(100vh - 250px)",
  };
  //
  const contentPart = "Sample Academic Reading Multiple Choice (one answer)";
  //! Render
  return (
    <>
      <Box sx={{ margin: "0 15px" }}>
        <CardPart content={questionType}></CardPart>
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
            <CardExercise
              content={<CardLeft test={test} dataChangePart={partRenderSelected} />}
              width={5.9}
              styleAdd={styleAddExercise}
            />

            <CardExercise
              content={
                <TOFFL
                  onClickPage={onClickPage}
                  questionSelected={questionSelected}
                  partRenderSelected={group[groupSelected.group]}
                  showQuestion={showQuestion}
                  onHightLightNumberPage={hightLightNumberPageClickQuestion}
                  displayNumber={displayNumber}
                  onClickQuestionType={onClickQuestionType}
                  getTextEachPart={getTextEachPart}
                  passageTextWithHighlightTexted={passageTextWithHighlightTexted}
                  onScannerText={onScannerText}
                />
              }
              width={6}
              styleAdd={styleAddExercise}
            />
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
      {isHightLight && (
        <CommonStyles.HightLightDialog onClickHighlight={onHightlight} onClickNote={onClickNote} position={position} />
      )}
      <CommonStyles.Note
        position={position}
        isOpenNote={isNoted}
        onCloseNote={onCloseNote}
        onChangeTextNote={onInputChange}
      />
      {isOpenOptionClear && (
        <CommonStyles.ClearDialog
          position={position}
          onClearHightlight={onClearHightLight}
          onClearHightlightAll={onClearHightLightAll}
        />
      )}
    </>
  );
};

const IeltsReadingContainer = () => {
  const { testCode } = useGetTestCode();
  const { data, isLoading } = useIeltsReading(testCode);
  useConfirmCloseBrowser();

  if (isLoading) {
    return <LoadingPage />;
  }

  return <Step2ExamContent data={data?.data?.data} />;
};

export default IeltsReadingContainer;
