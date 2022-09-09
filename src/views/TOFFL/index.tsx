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
}

const TOFFL = ({
  partRenderSelected,
  questionSelected,
  onClickPage,
  showQuestion,
  onHightLightNumberPage,
  displayNumber,
  onClickQuestionType,
}: TOFFLI) => {
  // console.log(partRenderSelected.questions.group?.[0]?.index);
  const [expanded, setExpanded] = useState(showQuestion);
  // console.log("partRenderSelected", partRenderSelected);
  //! Number

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
  // useEffect(() => {
  //   setExpanded(questionSelected);
  // }, [questionSelected]);
  //
  const renderPartValueGroup = (partRenderSelected: any) => {
    const questionType = partRenderSelected?.questionType;
    // console.log("questionType", questionType);
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
