import * as React from "react";
import RulesExamStep1 from "components/RulesExams/RulesExamStep1";
import ExamTest from "components/Exams/StartDoingHomework";
import EndTest from "components/Exams/EndTest";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum } from "constants/enum";
//
import { Box, Button } from "@mui/material";
//
import Header from "views/Ielts/Header/Header";

export interface IeltsReadingProps {}

const IeltsReading = (props: IeltsReadingProps) => {
  const { step } = useStepExam();

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <Header />
      <Box sx={{ mt: "80px" }}>
        {step === TypeStepExamEnum.STEP1 && <RulesExamStep1 />}
        {step === TypeStepExamEnum.STEP2 && <ExamTest />}
        {step === TypeStepExamEnum.STEP3 && <EndTest />}
      </Box>
    </Box>
  );
};

const IeltsListeningRoot = () => {
  return (
    <StepExamProvider>
      <IeltsReading />
    </StepExamProvider>
  );
};

export default IeltsListeningRoot;
