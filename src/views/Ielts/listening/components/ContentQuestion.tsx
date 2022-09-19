import NoteCompletion from "./CardRender/NoteCompletion";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import MultiChoice from "./CardRender/MultiChoice";
import TitleExam from "components/StepsWorkExercise/TitleExam/TitleExam";
import FlowChart from "./CardRender/FlowChart";
import SentenceCompletetion from "components/Ielts/components/SentenceCompletetion";
import MachingTypeListening from "./CardRender/MachingTypeListening";
import MachingHeading from "../../../../components/Ielts/components/MachingHeading";
import MultichoiceAnswer from "./CardRender/MultichoiceAnswer";
import { PartContentQuestionsI } from "../../../../constants/typeData.types";
// ! type

interface PartContentQuestionspPropsI {
  ContentQuestion?: PartContentQuestionsI | any;
  displayNumber: number;
  onClickPage: (options: object) => void;
  onClickQuestionType: (questionType: string) => void;
}

// interface PartContentQuestionspPropsI

const ContentQuestion = ({
  ContentQuestion,
  displayNumber,
  onClickPage,
  onClickQuestionType,
}: PartContentQuestionspPropsI) => {
  const questionType = ContentQuestion?.questionType;
  // console.log("questionType", questionType);

  const renderPartValueGroup = (ContentQuestion: PartContentQuestionsI) => {
    console.log("ContentQuestion", ContentQuestion);

    if (questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS) {
      return (
        <MachingTypeListening
          answerList={ContentQuestion.answerList}
          questionBox={ContentQuestion.questionBox ?? ""}
          questions={ContentQuestion.questions}
          onClickPage={onClickPage}
          displayNumber={displayNumber}
        />
      );
    }

    if (questionType === QUESTION_TYPE.NOTE_COMPLETION || questionType === QUESTION_TYPE.SUMMARY_COMPLETION) {
      return (
        <NoteCompletion
          displayNumber={displayNumber}
          groupData={ContentQuestion}
          questionBox={ContentQuestion.questionBox ?? ""}
          onClickPage={onClickPage}
        />
      );
    }

    if (questionType === QUESTION_TYPE.MATCHING_HEADINGS) {
      return (
        <MachingHeading
          question={ContentQuestion?.questions}
          answerList={ContentQuestion?.answerList}
          data={ContentQuestion?.questions}
          onClickPage={onClickPage}
          displayNumber={displayNumber}
        />
      );
    }

    if (
      questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION ||
      questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM ||
      questionType === QUESTION_TYPE.LABELLING_A_PLAN_MAP ||
      questionType === QUESTION_TYPE.FORM_COMPLETION ||
      questionType === QUESTION_TYPE.DIAGRAM_LABELING ||
      questionType === QUESTION_TYPE.TABLE_COMPLETION
    ) {
      return (
        <FlowChart
          onClickPage={onClickPage}
          questions={ContentQuestion?.questions}
          displayNumber={displayNumber}
          image={ContentQuestion.image}
        />
      );
    }

    if (questionType === QUESTION_TYPE.SENTENCE_COMPLETION) {
      return ContentQuestion?.questions.map((question: any) => {
        return (
          <>
            <SentenceCompletetion
              key={question._id}
              onClickPage={onClickPage}
              displayNumber={displayNumber}
              data={question}
            />
          </>
        );
      });
    }

    if (
      questionType === QUESTION_TYPE.MULTIPLE_CHOICE_1_ANSWER ||
      questionType === QUESTION_TYPE.IDENTIFYING_INFORMATION ||
      questionType === QUESTION_TYPE.IDENTIFYING_VIEWS_CLAIMS
    ) {
      return <MultiChoice onClickPage={onClickPage} questions={ContentQuestion?.questions} />;
    }

    if (questionType === QUESTION_TYPE.MULTIPLE_CHOICE_MULTIPLE_ANSWER) {
      return (
        <>
          <MultichoiceAnswer />
        </>
      );
    }

    return null;
  };

  return (
    <>
      <TitleExam title={ContentQuestion} />

      <div>{renderPartValueGroup(ContentQuestion)}</div>
      {/* {onClickQuestionType(ContentQuestion?.questionType ?? "")} */}
    </>
  );
};

export default ContentQuestion;
