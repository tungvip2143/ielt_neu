import React from "react";
import NoteCompletion from "./CardRender/NoteCompletion";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import MultiChoice from "./CardRender/MultiChoice";
import TitleExam from "components/StepsWorkExercise/TitleExam/TitleExam";

// ! type
interface Props {
  ContentQuestion?: any;
  audio?: any;
}
const ContentQuestion = ({ ContentQuestion, audio }: Props) => {
  const questionType = ContentQuestion?.questionType;

  const renderPartValueGroup = (ContentQuestion: any) => {
    if (questionType === QUESTION_TYPE.NOTE_COMPLETION) {
      return <NoteCompletion questionBox={ContentQuestion?.questionBox} />;
    }

    if (questionType === QUESTION_TYPE.MULTIPLE_CHOICE_1_ANSWER) {
      return <MultiChoice dataQuestions={ContentQuestion?.questions} audio={audio} />;
    }

    return null;
  };

  return (
    <>
      <TitleExam title={ContentQuestion} />

      <div>{renderPartValueGroup(ContentQuestion)}</div>
    </>
  );
};

export default ContentQuestion;
