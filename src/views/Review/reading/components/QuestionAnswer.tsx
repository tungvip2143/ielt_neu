import React, { useEffect, useState } from "react";
//
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//
import TitleExam from "components/StepsWorkExercise/TitleExam/TitleExam";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import QuestionItem from "./QuestionItem";

//
// !type
interface QuestionAnswerI {
  partRenderSelected?: any;
  questionSelected?: any;
  onClickPage: (id: string) => void;
  onHightLightNumberPage: (displayNumber: string) => void;
  showQuestion?: any;
}

const QuestionAnswer = ({
  partRenderSelected,
  questionSelected,
  onClickPage,
  showQuestion,
  onHightLightNumberPage,
}: QuestionAnswerI) => {
  console.log("showQuestion", showQuestion);
  // console.log(partRenderSelected.questions.group?.[0]?.index);
  const [expanded, setExpanded] = useState(showQuestion);
  const [dataPartGruop, setDataPartGroup] = useState();
  console.log("partRenderSelected2", partRenderSelected);
  console.log("questionSelected", questionSelected);

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
    console.log("partRenderSelected", partRenderSelected);
    const questionType = partRenderSelected?.questionType;
    if (
      questionType === QUESTION_TYPE.SUMMARY_COMPLETION ||
      questionType === QUESTION_TYPE.NOTE_COMPLETION ||
      questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION ||
      questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM ||
      questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS ||
      questionType === QUESTION_TYPE.MATCHING_HEADINGS ||
      questionType === QUESTION_TYPE.SUMMARY_COMPLETION
    ) {
      return (
        <QuestionItem
          image={partRenderSelected?.image}
          questionType={questionType}
          questionBox={partRenderSelected?.questionBox}
          question={partRenderSelected?.questions}
          answerList={partRenderSelected?.answerList}
        />
      );
    }
    return partRenderSelected?.questions?.map((question: any) => {
      console.log("abc", question);
      return (
        <>
          <QuestionItem
            key={question._id}
            question={question}
            questionType={questionType}
            expanded={expanded}
            onCollapse={handleCollapse}
            questionBox={partRenderSelected?.questionBox}
            onHightLightNumberPage={onHightLightNumberPage}
          />
        </>
      );
    });
  };

  //! Render
  return (
    <Box>
      <TitleExam title={partRenderSelected} />
      <Stack direction="column" spacing={1} sx={{ pb: "100px" }}>
        {renderPartValueGroup(partRenderSelected)}
        {/* {partRenderSelected.map((item: any) => {
          return <ItemQuestion expanded={expanded} onCollapse={handleCollapse} key={item.id} question={item} />;
        })} */}
      </Stack>
    </Box>
  );
};

export default QuestionAnswer;
