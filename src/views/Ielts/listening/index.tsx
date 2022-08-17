import * as React from "react";
import RulesExamStep1 from "components/RulesExams/RulesExamStep1";
import ExamTest from "./components/ExamTest";
import EndTest from "components/Exams/EndTest";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum } from "constants/enum";
//
import { Box, Button } from "@mui/material";
//
import Header from "views/Ielts/Header/Header";
import RulesListening from "components/RulesExams/RulesListening";
import { Form, Formik } from "formik";
import { useIeltsListening, useUpdateIeltsListeningTest } from "hooks/ielts/useIelts";
import { useSelector } from "react-redux";
import CardTotalPageExams from "components/Card/CardTotalPageExams";
import { useHistory } from "react-router-dom";
import ModalExit from "components/Modal/ModalExit";
import { IELT_TEST } from "interfaces/testType";

export interface IeltsListeningProps {}

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
const IeltsListening = (props: IeltsListeningProps) => {
  // !State
  const [open, setOpen] = React.useState<boolean>(false);

  const { step, handler } = useStepExam();
  const { mutateAsync: updateIeltsListening, isLoading } = useUpdateIeltsListeningTest();
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);

  // !Function
  const handleSubmitForm = async (values: any) => {
    const answers = values.answers.filter((el: any) => {
      return el.questionId && el.studentAnswer;
    });
    const body = { values: { answers }, testCode };
    await updateIeltsListening(body, {
      onSuccess: () => handler?.setStep && handler.setStep(TypeStepExamEnum.STEP3),
    });
  };
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
    <Formik initialValues={initialValues()} enableReinitialize onSubmit={(values) => handleSubmitForm(values)}>
      {(formik) => (
        <Form>
          <Box sx={{ height: "100vh", overflow: "hidden" }}>
            <Header onShowModalExit={handleShowModal} />
            <Box sx={{ mt: "80px" }}>
              {step === TypeStepExamEnum.STEP1 && <RulesListening />}
              {step === TypeStepExamEnum.STEP2 && <ExamTest />}
              {step === TypeStepExamEnum.STEP3 && <EndTest test={IELT_TEST.LISTENING} />}
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
      <IeltsListening />
    </StepExamProvider>
  );
};

export default IeltsListeningRoot;
