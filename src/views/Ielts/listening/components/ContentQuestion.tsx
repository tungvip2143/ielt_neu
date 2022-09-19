import NoteCompletion from "./CardRender/NoteCompletion";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import MultiChoice from "./CardRender/MultiChoice";
import TitleExam from "components/StepsWorkExercise/TitleExam/TitleExam";
import FlowChart from "./CardRender/FlowChart";
import SentenceCompletetion from "components/Ielts/components/SentenceCompletetion";
import MachingTypeListening from "./CardRender/MachingTypeListening";
import MachingHeading from "../../../../components/Ielts/components/MachingHeading";
import MultichoiceAnswer from "./CardRender/MultichoiceAnswer";
import { useRightClick } from "hooks/ielts/useRightClick";
import { useNoted } from "hooks/ielts/useNoted";
import { useHightLightText } from "hooks/ielts/useHighlightText";
import CommonStyles from "components/CommonStyles";
import { useClearHighlight } from "hooks/ielts/useClearHighlight";
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
  console.log("ContentQuestion", ContentQuestion);
  // console.log("questionType", questionType);

  // !Hook
  const { isAction, position, toggleAction, className } = useRightClick();
  const { onChangeInput, onClickNote, isNoted, noted, toggleNote } = useNoted({ toggleAction, className });
  useHightLightText({ noted, toggleNote });
  const { clearAll, clearMarkItem } = useClearHighlight({ className });

  const renderPartValueGroup = (ContentQuestion: any) => {
    console.log("ContentQuestion", ContentQuestion);

    if (questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS) {
      return (
        <MachingTypeListening
          answerList={ContentQuestion?.answerList}
          questionBox={ContentQuestion?.questionBox}
          data={ContentQuestion?.questions}
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
          questionBox={ContentQuestion?.questionBox}
          onClickPage={onClickPage}
        />
      );
    }

    if (questionType === QUESTION_TYPE.MATCHING_HEADINGS) {
      return (
        <MachingHeading
          question={ContentQuestion?.questions}
          answerList={ContentQuestion?.answerList}
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
          question={ContentQuestion?.questions}
          displayNumber={displayNumber}
          image={ContentQuestion}
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
      return <MultiChoice onClickPage={onClickPage} dataQuestions={ContentQuestion?.questions} audio={audio} />;
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

      <div className="exam">
        {renderPartValueGroup(ContentQuestion)}
        {onClickQuestionType(ContentQuestion?.questionType)}
        {isAction && (
          <CommonStyles.HightLightDialog
            clearAll={clearAll}
            onCloseAction={toggleAction}
            onClickNote={onClickNote}
            position={position}
            clearMarkItem={clearMarkItem}
          />
        )}
        {isNoted && (
          <CommonStyles.Note
            onCloseNote={toggleNote}
            noted={noted}
            position={position}
            onChangeTextNote={onChangeInput}
            className={className}
          />
        )}
      </div>
    </>
  );
};

export default ContentQuestion;
