import React, { useState, useEffect } from "react";
//
import { ieltsApi } from "api/ieltsResults";
//
import Text from "components/Typography/index";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//
import ItemQuestion from "components/StepsWorkExercise/Step1/CardItem";
import TitleExam from "components/StepsWorkExercise/TitleExam/TitleExam";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";

//
// !type
interface TOFFLI {
  partRenderSelected?: any;
  questionSelected?: any;
  onClickPage: (id: string) => void;
  onHightLightNumberPage: (displayNumber: number) => void;
  showQuestion?: any;
  displayNumber: number;
  onClickQuestionType?: any;
  getTextEachPart?: (text: string) => void;
  passageTextWithHighlightTexted: string;
  onScannerText: (data: any) => void;
}

const TOFFL = ({
  partRenderSelected,
  questionSelected,
  onClickPage,
  showQuestion,
  onHightLightNumberPage,
  displayNumber,
  onClickQuestionType,
  getTextEachPart,
  passageTextWithHighlightTexted,
  onScannerText,
}: TOFFLI) => {
  const [expanded, setExpanded] = useState(showQuestion);
  //! Number
  console.log("Fsdfs", partRenderSelected);
  const dataNumber = {
    from: "1",
    to: "6",
  };
  //
  const handleCollapse = (id: any) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? id : false);
    onClickPage(id);
  };
  useEffect(() => {
    setExpanded(showQuestion);
  }, [showQuestion]);
  const renderPartValueGroup = (partRenderSelected: any) => {
    const questionType = partRenderSelected?.questionType;
    if (
      questionType === QUESTION_TYPE.SUMMARY_COMPLETION ||
      questionType === QUESTION_TYPE.NOTE_COMPLETION ||
      questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION ||
      questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM ||
      questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS ||
      questionType === QUESTION_TYPE.MATCHING_HEADINGS
    ) {
      return (
        <ItemQuestion
          image={partRenderSelected?.image}
          questionType={questionType}
          questionBox={partRenderSelected?.questionBox}
          question={partRenderSelected?.questions}
          answerList={partRenderSelected?.answerList}
          onHightLightNumberPage={onHightLightNumberPage}
          displayNumber={displayNumber}
          onClickPage={onClickPage}
          getTextEachPart={getTextEachPart}
          passageTextWithHighlightTexted={passageTextWithHighlightTexted}
          onScannerText={onScannerText}
        />
      );
    }
    return partRenderSelected?.questions?.map((question: any, questionIdx: number) => {
      return (
        <>
          <ItemQuestion
            key={question._id}
            question={question}
            questionIdx={questionIdx}
            questionType={questionType}
            expanded={expanded}
            onCollapse={handleCollapse}
            questionBox={partRenderSelected?.questionBox}
            onHightLightNumberPage={onHightLightNumberPage}
            displayNumber={displayNumber}
            onClickPage={onClickPage}
            getTextEachPart={getTextEachPart}
            passageTextWithHighlightTexted={passageTextWithHighlightTexted}
          />
        </>
      );
    });
  };

  //! Render
  return (
    <Box>
      <TitleExam dataNumber={dataNumber} title={partRenderSelected} />
      <Stack direction="column" spacing={1} sx={{ pb: "100px" }}>
        {renderPartValueGroup(partRenderSelected)}
        {onClickQuestionType(partRenderSelected?.questionType)}
      </Stack>
    </Box>
  );
};

export default TOFFL;
