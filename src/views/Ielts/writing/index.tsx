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
import RulesWriting from "components/RulesExams/RulesWriting";
import { Form, Formik } from "formik";
import { useIeltsWritting, useUpdateIeltsWriting } from "hooks/ielts/useIelts";
import { useSelector } from "react-redux";
import LoadingPage from "components/Loading";
import { IELT_TEST } from "interfaces/testType";

export interface IeltsReadingProps {}

const initialsValues = {
  answers: [
    {
      questionId: "",
      studentAnswer: "",
    },
  ],
};

const IeltsWriting = (props: IeltsReadingProps) => {
  const { step, handler } = useStepExam();
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);

  const { data, isLoading } = useIeltsWritting(testCode);
  const { mutateAsync: updateIeltsWriting } = useUpdateIeltsWriting();
  console.log("writing data", data);
  if (isLoading) {
    return <LoadingPage />;
  }

  const handleSubmit = async (values: any) => {
    await updateIeltsWriting(
      { values, testCode },
      {
        onSuccess: () => handler?.setStep && handler.setStep(TypeStepExamEnum.STEP3),
      }
    );
  };

  return (
    <Formik
      initialValues={initialsValues}
      onSubmit={(values: any) => {
        handleSubmit(values);
      }}
    >
      {(formik: any) => (
        <Form>
          <Box sx={{ height: "100vh", overflow: "hidden" }}>
            <Header />
            <Box sx={{ mt: "80px" }}>
              {step === TypeStepExamEnum.STEP1 && <RulesWriting />}
              {step === TypeStepExamEnum.STEP2 && <ExamTest test={IELT_TEST.WRITING} data={data?.data?.data} />}
              {step === TypeStepExamEnum.STEP3 && <EndTest test={IELT_TEST.WRITING} />}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const IeltsWritingRoot = () => {
  return (
    <StepExamProvider>
      <IeltsWriting />
    </StepExamProvider>
  );
};

export default IeltsWritingRoot;
