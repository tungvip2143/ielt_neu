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
import DetailUser from "../../components/DetailUser/DetailUser";
import RuleExam from "../../components/RuleExam/RuleExam";
import InformationForCandidates from "views/components/dataSteps/DataContentWriting/InformationForCandidates";
import IntructionsToCandidates from "views/components/dataSteps/DataContentWriting/IntructionsToCandidates";
import ModalHelpExam from "../../../components/Modal/ModalHelpExam";
import ModalHide from "../../../components/Modal/ModalHide";
//
const stepRuleExam = {
  typeExam: "Reading",
  time: "1 hour",
  informationsForCandidates: <InformationForCandidates />,
  intructionsToCandidates: <IntructionsToCandidates />,
};

export interface IeltsReadingProps {
  data: any;
  testCode: number;
}

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
  // !State
  const { data, testCode } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [isOpenModalHelp, setIsOpenModalHelp] = React.useState(false);
  const [isOpenModalHide, setIsOpenModalHide] = React.useState(false);

  const { step, handler } = useStepExam();

  const { mutateAsync: submitIeltsReadingTest } = useUpdateIeltsReadingTest();

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
  const handleOpenModalHelp = () => {
    setIsOpenModalHelp(true);
  };
  const handleCloseModalHelp = () => {
    setIsOpenModalHelp(false);
  };
  //
  const handleOpenModalHide = () => {
    setIsOpenModalHide(true);
  };
  const handleCloseModalHide = () => {
    setIsOpenModalHide(false);
  };
  //

  const handleBackIeltsSelection = () => {
    history.push("/ielts");
  };
  const containerSteps = {
    pt: "16px",
    background: "#dbe5f5",
    height: "100%",
  };
  const styleModal = {
    width: "770px",
    padding: "10px !important",
    // overflow: "hidden",
  };
  const styleModalExit = {
    padding: "20px",
  };
  return (
    <Formik initialValues={initialValues()} onSubmit={handleSubmit}>
      {(formik: any) => (
        <Form>
          <Box sx={{ height: { xs: "", lg: "100vh" }, overflow: { Xs: "", lg: "hidden" } }}>
            <Header
              onShowModalExit={handleShowModal}
              handleOpenModalHelp={handleOpenModalHelp}
              handleOpenModalHide={handleOpenModalHide}
            />
            <Box sx={containerSteps}>
              {step === TypeStepExamEnum.STEP1 && <DetailUser />}
              {step === TypeStepExamEnum.STEP2 && <RuleExam stepRuleExam={stepRuleExam} />}
              {step === TypeStepExamEnum.STEP3 && <ExamTest test={IELT_TEST.READING} data={data} />}
              {step === TypeStepExamEnum.STEP4 && <EndTest test={IELT_TEST.READING} />}
            </Box>
          </Box>
          {open && (
            <ModalExit
              open={open}
              width="560px"
              handleCloseModal={handleCloseModal}
              handleBackIeltsSelection={handleBackIeltsSelection}
              styleModal={styleModalExit}
            />
          )}
          {isOpenModalHelp && (
            <ModalHelpExam open={isOpenModalHelp} styleModal={styleModal} handleCloseModal={handleCloseModalHelp} />
          )}
          {isOpenModalHide && (
            <ModalHide open={isOpenModalHide} styleModal={styleModal} handleCloseModal={handleCloseModalHide} />
          )}
        </Form>
      )}
    </Formik>
  );
};

const IeltsReadingContainer = () => {
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useIeltsReading(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <IeltsReading data={data?.data?.data} testCode={testCode} />;
};

const IeltsListeningRoot = () => {
  return (
    <StepExamProvider>
      <IeltsReadingContainer />
    </StepExamProvider>
  );
};

export default IeltsListeningRoot;
