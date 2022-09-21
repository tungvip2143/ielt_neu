//
import IdentifyInformationType from "components/Ielts/components/IdentifyInformationType";
import MachingHeading from "components/Ielts/components/MachingHeading";
import MatchingType from "components/Ielts/components/MachingType";
import QuestionBox from "components/Ielts/components/QuestionBox";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import FlowChart from "components/Ielts/components/FlowChart";
import SentenceCompletetion from "components/Ielts/components/SentenceCompletetion";
import MatchingParagrapInformation from "../../Ielts/components/MatchingParagrapInformation";
import { QuestionItemI, PartContentQuestionsI } from "../../../constants/typeData.types";
import { string } from "yup";
//
interface PropsItemQuestion {
  expanded?: string;
  questionBox?: string;
  questions?: QuestionItemI[];
  question?: QuestionItemI | any;
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
  questions,
  question,
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
  // console.log("432424", questions);
  // console.log("423", question);

  const renderQuestion = (dataQuestions: QuestionItemI[], dataQuestionItem: QuestionItemI) => {
    if (questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS) {
      return (
        <MatchingType
          answerList={answerList ?? ""}
          questionBox={questionBox ?? ""}
          questions={dataQuestions}
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
          questions={dataQuestions}
          questionBox={questionBox ?? ""}
        />
      );
    }
    if (questionType === QUESTION_TYPE.MATCHING_HEADINGS) {
      return (
        <MachingHeading
          questions={dataQuestions}
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
            questions={dataQuestions}
            displayNumber={displayNumber}
            onClickPage={onClickPage}
          />
        </>
      );
    }

    if (
      questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION ||
      questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM ||
      questionType === QUESTION_TYPE.TABLE_COMPLETION
    ) {
      return (
        <FlowChart onClickPage={onClickPage} question={dataQuestions} image={image} displayNumber={displayNumber} />
      );
    }

    //* da map roi
    if (questionType === QUESTION_TYPE.SENTENCE_COMPLETION) {
      return <SentenceCompletetion displayNumber={displayNumber} data={dataQuestionItem} onClickPage={onClickPage} />;
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
            question={dataQuestionItem}
            displayNumber={displayNumber}
            questionIdx={questionIdx}
            onClickPage={onClickPage}
          />
        </>
      );
    }
  };

  return <>{renderQuestion(questions ?? [], question)}</>;
};
export default ItemQuestion;
