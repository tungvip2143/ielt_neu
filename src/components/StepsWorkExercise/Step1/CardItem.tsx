//
import IdentifyInformationType from "components/Ielts/components/IdentifyInformationType";
import MachingHeading from "components/Ielts/components/MachingHeading";
import MatchingType from "components/Ielts/components/MachingType";
import QuestionBox from "components/Ielts/components/QuestionBox";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import FlowChart from "components/Ielts/components/FlowChart";
import SentenceCompletetion from "components/Ielts/components/SentenceCompletetion";
//
interface PropsItemQuestion {
  expanded?: any;
  questionBox?: any;
  question?: any;
  idShowQuestion?: any;
  onHightLightNumberPage: (displayNumber: number) => void;

  // onCollapse: (id: any) => (e: any, expanded: any) => void;
  onCollapse?: any;
  questionType?: string;
  image?: string;
  answerList?: any;
  directionText?: any;
  displayNumber: number;
  questionIdx?: number;
  onClickPage?: (option: any) => void;
  getTextEachPart?: (text: string) => void;
  passageTextWithHighlightTexted: string;
  onScannerText?: (data: any) => void;
}
const ItemQuestion = ({
  question = [],
  expanded,
  onCollapse,
  questionType,
  questionBox,
  image,
  answerList,
  displayNumber,
  questionIdx,
  onClickPage,
  getTextEachPart,
  passageTextWithHighlightTexted,
  onScannerText,
  ...remainProps
}: PropsItemQuestion) => {
  const renderQuestion = (data: any) => {
    // console.log("dataQuestions", data);

    if (questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS) {
      return (
        <MatchingType
          answerList={answerList}
          questionBox={questionBox}
          data={data}
          onClickPage={onClickPage}
          displayNumber={displayNumber}
          getTextEachPart={getTextEachPart}
          passageTextWithHighlightTexted={passageTextWithHighlightTexted}
          onScannerText={onScannerText}
        />
      );
    }
    if (questionType === QUESTION_TYPE.SUMMARY_COMPLETION) {
      return (
        <QuestionBox
          onClickPage={onClickPage}
          displayNumber={displayNumber}
          questions={data}
          questionBox={questionBox}
          getTextEachPart={getTextEachPart}
          passageTextWithHighlightTexted={passageTextWithHighlightTexted}
          onScannerText={onScannerText}
        />
      );
    }
    if (questionType === QUESTION_TYPE.NOTE_COMPLETION) {
      return (
        <QuestionBox
          onClickPage={onClickPage}
          displayNumber={displayNumber}
          questions={data}
          questionBox={questionBox}
          getTextEachPart={getTextEachPart}
          passageTextWithHighlightTexted={passageTextWithHighlightTexted}
          onScannerText={onScannerText}
        />
      );
    }
    if (questionType === QUESTION_TYPE.MATCHING_HEADINGS) {
      return (
        <MachingHeading
          question={question}
          answerList={answerList}
          data={data}
          onClickPage={onClickPage}
          displayNumber={displayNumber}
        />
      );
    }
    if (questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION || questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM) {
      return <FlowChart onClickPage={onClickPage} question={question} image={image} displayNumber={displayNumber} />;
    }
    if (questionType === QUESTION_TYPE.SENTENCE_COMPLETION) {
      return <SentenceCompletetion onClickPage={onClickPage} displayNumber={displayNumber} data={data} />;
    }
    if (
      questionType === QUESTION_TYPE.IDENTIFYING_INFORMATION ||
      questionType === QUESTION_TYPE.MULTIPLE_CHOICE_1_ANSWER ||
      questionType === QUESTION_TYPE.IDENTIFYING_VIEWS_CLAIMS
    ) {
      return (
        <IdentifyInformationType
          questionType={questionType}
          QUESTION_TYPE={QUESTION_TYPE}
          question={question}
          // expanded={expanded}
          // onCollapse={onCollapse}
          displayNumber={displayNumber}
          questionIdx={questionIdx}
          onClickPage={onClickPage}
        />
      );
    }
  };

  return <>{renderQuestion(question)}</>;
};
export default ItemQuestion;
//
