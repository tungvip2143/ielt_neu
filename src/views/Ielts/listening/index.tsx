import * as React from "react";
import RulesExamStep1 from "components/RulesExams/RulesExamStep1";
import ExamTest from "components/Exams/StartDoingHomework";
import EndTest from "components/Exams/EndTest";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum } from "constants/enum";

export interface IeltsListeningProps {}

const IeltsListening = (props: IeltsListeningProps) => {
  const { step } = useStepExam();

  return (
    <React.Fragment>
      {step === TypeStepExamEnum.STEP1 && <RulesExamStep1 />}
      {step === TypeStepExamEnum.STEP2 && <ExamTest />}
      {step === TypeStepExamEnum.STEP3 && <EndTest />}
    </React.Fragment>
  );
};

const IeltsListeningRoot = () => {
  return (
    <StepExamProvider>
      <IeltsListening />
    </StepExamProvider>
  );
};

export default IeltsListeningRoot;
