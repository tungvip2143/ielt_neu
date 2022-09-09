import React from "react";
import NoteCompletion from "./CardRender/NoteCompletion";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import MultiChoice from "./CardRender/MultiChoice";
import TitleExam from "components/StepsWorkExercise/TitleExam/TitleExam";
import FlowChart from "./CardRender/FlowChart";
import SentenceCompletetion from "components/Ielts/components/SentenceCompletetion";
// ! type
interface Props {
  ContentQuestion?: any;
  audio?: any;
  displayNumber: number;
  onClickPage: (options: any) => void;
  onClickQuestionType?: any;
}
const ContentQuestion = ({ ContentQuestion, audio, displayNumber, onClickPage, onClickQuestionType }: Props) => {
  const questionType = ContentQuestion?.questionType;
  // console.log("ContentQuestion", ContentQuestion);
  // console.log("questionType", questionType);

  const renderPartValueGroup = (ContentQuestion: any) => {
    if (questionType === QUESTION_TYPE.NOTE_COMPLETION) {
      return (
        <NoteCompletion
          displayNumber={displayNumber}
          groupData={ContentQuestion}
          questionBox={ContentQuestion?.questionBox}
          onClickPage={onClickPage}
        />
      );
    }
    if (
      questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION ||
      questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM ||
      questionType === QUESTION_TYPE.LABELLING_A_PLAN_MAP
    ) {
      return <FlowChart question={ContentQuestion?.questions} displayNumber={displayNumber} image={ContentQuestion} />;
    }
    if (questionType === QUESTION_TYPE.SENTENCE_COMPLETION) {
      return ContentQuestion?.questions.map((question: any) => {
        console.log("question", question);
        return (
          <>
            <SentenceCompletetion onClickPage={onClickPage} displayNumber={displayNumber} data={question} />
          </>
        );
      });
    }
    if (
      questionType === QUESTION_TYPE.MULTIPLE_CHOICE_1_ANSWER ||
      questionType === QUESTION_TYPE.IDENTIFYING_INFORMATION ||
      questionType === QUESTION_TYPE.IDENTIFYING_VIEWS_CLAIMS
    ) {
      return <MultiChoice onClickPage={onClickPage} dataQuestions={ContentQuestion?.questions} audio={audio} />;
    }

    return null;
  };

  return (
    <>
      <TitleExam title={ContentQuestion} />

      <div>
        {renderPartValueGroup(ContentQuestion)}
        {onClickQuestionType(ContentQuestion?.questionType)}
      </div>
    </>
  );
};

export default ContentQuestion;
