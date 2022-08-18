//
//
import IdentifyInformationType from "components/Ielts/components/IdentifyInformationType";
import MachingHeading from "components/Ielts/components/MachingHeading";
import MatchingType from "components/Ielts/components/MachingType";
import QuestionBox from "components/Ielts/components/QuestionBox";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import { useFormikContext } from "formik";
import FlowChart from "components/Ielts/components/FlowChart";
import SentenceCompletetion from "components/Ielts/components/SentenceCompletetion";
//
interface PropsItemQuestion {
  expanded?: any;
  questionBox?: any;
  question?: any;
  idShowQuestion?: any;
  onHightLightNumberPage?: (displayNumber: string) => void;

  // onCollapse: (id: any) => (e: any, expanded: any) => void;
  onCollapse?: any;
  questionType?: string;
  image?: string;
  answerList?: any;
}
const ItemQuestion = ({
  question = [],
  expanded,
  onCollapse,
  questionType,
  questionBox,
  image,
  onHightLightNumberPage,
  answerList,
  ...remainProps
}: PropsItemQuestion) => {
  console.log("questionType", questionType);

  // const [value, setValue] = useState("a");
  // const [expanded, setExpanded] = useState(remainProps.expanded);

  // const handleCollapse = (id: any) => (event: React.SyntheticEvent, newExpanded: boolean) => {
  //   console.log("newExpanded", newExpanded);
  //   setExpanded(newExpanded ? id : false);
  // };
  // useEffect(() => {
  //   setExpanded(remainProps.expanded);
  // }, [remainProps.expanded]);
  const { values } = useFormikContext();

  console.log("values formik", values);

  const renderQuestion = (data: any) => {
    if (questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS) {
      return <MatchingType answerList={answerList} questionBox={questionBox} data={data} />;
    }
    if (questionType === QUESTION_TYPE.SUMMARY_COMPLETION) {
      return <QuestionBox questionBox={questionBox} />;
    }
    if (questionType === QUESTION_TYPE.NOTE_COMPLETION) {
      return <QuestionBox questionBox={questionBox} />;
    }
    if (questionType === QUESTION_TYPE.MATCHING_HEADINGS) {
      return <MachingHeading data={data} />;
    }
    if (questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION || questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM) {
      return <FlowChart question={question} image={image} />;
    }
    if (questionType === QUESTION_TYPE.SENTENCE_COMPLETION) {
      return <SentenceCompletetion data={data} />;
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
          expanded={expanded}
          onCollapse={onCollapse}
          onHightLightNumberPage={onHightLightNumberPage}
        />
      );
    }
  };

  return <>{renderQuestion(question)}</>;
};
export default ItemQuestion;
//
