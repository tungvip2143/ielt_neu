import FormikCom from "components/Formik";
//
import RulesExam from "components/Exams/RulesExam";
import Text from "components/Typography";
//
import EndTest from "components/Exams/EndTest";
import ExamTest from "components/Exams/StartDoingHomework";

export interface ReadingProps {}

export default function IeltsWriting(props: ReadingProps) {
  const typeExam = "ILETS ACADEMY READING";
  const timeExam = "you will have 60 minutes to do the Reading test";
  //
  const InstructionsToTest = () => {
    return (
      <ul>
        <li>
          <Text.Desc16>Answer all the questions </Text.Desc16>
        </li>
        <li>
          <Text.Desc16>You can change your answer at any time during the test </Text.Desc16>
        </li>
      </ul>
    );
  };
  const InformationForTest = () => {
    return (
      <ul>
        <li>
          <Text.Desc16>There are 40 questions in this test</Text.Desc16>
        </li>
        <li>
          <Text.Desc16>Each questions carries one mark </Text.Desc16>
        </li>
        <li>
          <Text.Desc16>The test clock will show you when there are 5 minutes remaining</Text.Desc16>
        </li>
        <li>
          <Text.Desc16>You can prepare a piece of paper and a pencil to take notes during this test</Text.Desc16>
        </li>
      </ul>
    );
  };
  return (
    <FormikCom initialValues={{}} text="Start Test">
      <RulesExam
        typeExam={typeExam}
        timeExam={timeExam}
        instructionsToTest={<InstructionsToTest />}
        informationForTest={<InformationForTest />}
      />
      <ExamTest />
      <EndTest />
    </FormikCom>
  );
}
