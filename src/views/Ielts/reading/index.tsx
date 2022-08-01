import FormikCom from "components/Formik";
import * as React from "react";
import { Box } from "@mui/material";
//
import RulesExam from "components/Exams/RulesExam";
import RulesExamStep1 from "components/RulesExams/RulesExamStep1";

//
import ExamTest from "components/Exams/StartDoingHomework";
import EndTest from "components/Exams/EndTest";

export interface ReadingProps {}

export default function IeltsReading(props: ReadingProps) {
  return (
    <FormikCom initialValues={{}} text="Start Test">
      <RulesExamStep1 />
      <ExamTest />
      <EndTest />
    </FormikCom>
  );
}
