//
import IdentifyInformationType from "components/Ielts/components/IdentifyInformationType";
import MachingHeading from "components/Ielts/components/MachingHeading";
import MatchingType from "components/Ielts/components/MachingType";
import QuestionBox from "components/Ielts/components/QuestionBox";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import FlowChart from "components/Ielts/components/FlowChart";
import SentenceCompletetion from "components/Ielts/components/SentenceCompletetion";
import MatchingParagrapInformation from "../../Ielts/components/MatchingParagrapInformation";
import { QuestionItemI } from "../../../constants/typeData.types";
//
interface PropsItemQuestion {
  expanded?: string;
  questionBox?: string;
  question: any;
  idShowQuestion?: boolean;

  // onCollapse: (id: any) => (e: any, expanded: any) => void;
  onCollapse?: (id: Event | any) => void;
  questionType?: string;
  image?: string;
  answerList?: string;
  directionText?: string;
  displayNumber: number;
  questionIdx?: number;
  onClickPage: (option: object) => void;
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
  ...remainProps
}: PropsItemQuestion) => {
  // console.log("questionTYpe", questionType);
  // console.log("432424", question);

  const renderQuestion = (data: any) => {
    if (questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS) {
      return (
        <MatchingType
          answerList={answerList ?? ""}
          questionBox={questionBox ?? ""}
          data={data}
          onClickPage={onClickPage}
          displayNumber={displayNumber}
        />
      );
    }
    if (questionType === QUESTION_TYPE.NOTE_COMPLETION || questionType === QUESTION_TYPE.SUMMARY_COMPLETION) {
      return (
        <QuestionBox
          onClickPage={onClickPage}
          displayNumber={displayNumber}
          questions={data}
          questionBox={questionBox ?? ""}
        />
      );
    }
    if (questionType === QUESTION_TYPE.MATCHING_HEADINGS) {
      return (
        <MachingHeading
          question={question}
          answerList={answerList ?? ""}
          onClickPage={onClickPage}
          displayNumber={displayNumber}
        />
      );
    }
    if (questionType === QUESTION_TYPE.MATCHING_PARAGRAPH_INFORMATION) {
      return (
        <>
          <MatchingParagrapInformation
            questions={data}
            displayNumber={displayNumber}
            onClickPage={onClickPage}
            question={question}
          />
        </>
      );
    }

    if (
      questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION ||
      questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM ||
      questionType === QUESTION_TYPE.TABLE_COMPLETION
    ) {
      return <FlowChart onClickPage={onClickPage} question={question} image={image} displayNumber={displayNumber} />;
    }

    if (questionType === QUESTION_TYPE.SENTENCE_COMPLETION) {
      return <SentenceCompletetion displayNumber={displayNumber} data={data} onClickPage={onClickPage} />;
    }

    if (
      questionType === QUESTION_TYPE.IDENTIFYING_INFORMATION ||
      questionType === QUESTION_TYPE.MULTIPLE_CHOICE_1_ANSWER ||
      questionType === QUESTION_TYPE.IDENTIFYING_VIEWS_CLAIMS
    ) {
      return (
        <>
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
        </>
      );
    }
  };

  return <>{renderQuestion(question)}</>;
};
export default ItemQuestion;
