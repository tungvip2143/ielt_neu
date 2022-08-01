import FormikCom from "components/Formik";
import * as React from "react";
import { Box } from "@mui/material";
//
import RulesExam from "components/Exams/RulesExam";
//
import ExamTest from "components/Exams/StartDoingHomework";
import EndTest from "components/Exams/EndTest";
import Text from "components/Typography/index";
export interface ReadingProps {}

export default function IeltsWriting(props: ReadingProps) {
  const typeExam = "ILETS ACADEMY READING";
  const timeExam = "you will have 60 minutes to do the Reading test";
  //
  const InstructionsToTest = () => {
    return (
      <ul>
        <li>
          <Text.DescSmallCard>Answer all the questions </Text.DescSmallCard>
        </li>
        <li>
          <Text.DescSmallCard>You can change your answer at any time during the test </Text.DescSmallCard>
        </li>
      </ul>
    );
  };
  const InformationForTest = () => {
    return (
      <ul>
        <li>
          <Text.DescSmallCard>There are 40 questions in this test</Text.DescSmallCard>
        </li>
        <li>
          <Text.DescSmallCard>Each questions carries one mark </Text.DescSmallCard>
        </li>
        <li>
          <Text.DescSmallCard>The test clock will show you when there are 5 minutes remaining</Text.DescSmallCard>
        </li>
        <li>
          <Text.DescSmallCard>
            You can prepare a piece of paper and a pencil to take notes during this test
          </Text.DescSmallCard>
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
