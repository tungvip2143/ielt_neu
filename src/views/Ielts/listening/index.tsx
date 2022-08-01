import * as React from "react";
import { Container, Box, Button, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
//
import RulesExamStep1 from "components/RulesExams/RulesExamStep1";
import FormikCom from "components/Formik/index";
import ExamTest from "components/Exams/StartDoingHomework";
import EndTest from "components/Exams/EndTest";

const useStyle = makeStyles((theme?: any) => {
  root: {
  }
  header: {
  }
});

export interface IeltsListeningProps {}

export default function IeltsListening(props: IeltsListeningProps) {
  // !Style
  const classes = useStyle();

  // TODO : chinh height động cho header
  return (
    <>
      <FormikCom initialValues={{}} text="submit">
        <RulesExamStep1 />
        <ExamTest />
        <EndTest />
      </FormikCom>
    </>
  );
}
