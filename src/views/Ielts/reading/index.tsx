import FormikCom from "components/Formik";
import * as React from "react";
import { Box } from "@mui/material";
//
import RulesExam from "components/Exams/RulesExam";
import Desc16 from "components/Typography/Desc16";
//
import StartDoingHomework from "components/Exams/StartDoingHomework";
import EndTest from "components/Exams/EndTest";

export interface ReadingProps {}

export default function IeltsReading(props: ReadingProps) {
  const typeExam = "ILETS ACADEMY READING";
  const timeExam = "you will have 60 minutes to do the Reading test";
  //
  const InstructionsToTest = () => {
    return (
      <ul>
        <li>
          <Desc16>Answer all the questions </Desc16>
        </li>
        <li>
          <Desc16>You can change your answer at any time during the test </Desc16>
        </li>
      </ul>
    );
  };
  const InformationForTest = () => {
    return (
      <ul>
        <li>
          <Desc16>There are 40 questions in this test</Desc16>
        </li>
        <li>
          <Desc16>Each questions carries one mark </Desc16>
        </li>
        <li>
          <Desc16>The test clock will show you when there are 5 minutes remaining</Desc16>
        </li>
        <li>
          <Desc16>You can prepare a piece of paper and a pencil to take notes during this test</Desc16>
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
      <StartDoingHomework />
      <EndTest />
    </FormikCom>
  );
}
