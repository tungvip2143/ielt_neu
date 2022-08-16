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
import { useIeltsListening, useIeltsReading, useUpdateIeltsReadingTest } from "hooks/ielts/useIelts";
import { useSelector } from "react-redux";
import LoadingPage from "components/Loading";
import { Formik, Form, FormikProps } from "formik";
import { IELT_TEST } from "interfaces/testType";
//
import { useHistory } from "react-router-dom";
import ModalExit from "components/Modal/ModalExit";
export interface IeltsReadingProps {}

const initialValues = function () {
  let value = {
    questionId: "",
    studentAnswer: "",
  };
  let answers = [];
  for (let i = 0; i < 40; i++) {
    answers.push(value);
  }
  return { answers };
};

const IeltsReading = (props: IeltsReadingProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { step, handler } = useStepExam();
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useIeltsReading(testCode);
  const { mutateAsync: submitIeltsReadingTest } = useUpdateIeltsReadingTest();

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleSubmit = async (values: any) => {
    const answers = values.answers.filter((el: any) => {
      return el.questionId && el.studentAnswer;
    });
    const body = { values: { answers }, testCode };
    await submitIeltsReadingTest(body, {
      onSuccess: () => {
        handler?.setStep && handler.setStep(TypeStepExamEnum.STEP3);
      },
    });
  };
  //

  const history = useHistory();

  //
  const handleShowModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => setOpen(false);
  //
  const handleBackIeltsSelection = () => {
    history.push("/ielts");
  };
  return (
    <Formik initialValues={initialValues()} onSubmit={handleSubmit}>
      {(formik: any) => (
        <Form>
          <Box sx={{ height: { xs: "", lg: "100vh" }, overflow: { Xs: "", lg: "hidden" } }}>
            <Header onShowModalExit={handleShowModal} />
            <Box sx={{ pt: "80px" }}>
              {step === TypeStepExamEnum.STEP1 && <RulesExamStep1 />}
              {step === TypeStepExamEnum.STEP2 && <ExamTest test={IELT_TEST.READING} data={data?.data?.data} />}
              {step === TypeStepExamEnum.STEP3 && <EndTest test={IELT_TEST.READING} />}
            </Box>
          </Box>
          {open && (
            <ModalExit
              open={open}
              width="560px"
              handleCloseModal={handleCloseModal}
              handleBackIeltsSelection={handleBackIeltsSelection}
            />
          )}
        </Form>
      )}
    </Formik>
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
