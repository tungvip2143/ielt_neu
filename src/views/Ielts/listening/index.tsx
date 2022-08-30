import React, { useCallback, useMemo } from "react";
import ExamTest from "./components/ExamTest";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum, TypeExam } from "constants/enum";
//
import { Box, Button } from "@mui/material";
//
import Header from "views/Ielts/Header/Header";
import { Form, Formik } from "formik";
import { useUpdateIeltsListeningTest } from "hooks/ielts/useIelts";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DetailUser from "../../components/DetailUser/DetailUser";
import RuleExam from "../../components/RuleExam/RuleExam";
//
import InformationForCandidatesListening from "views/components/dataSteps/DataContentListening/InformationForCandidates";
import IntructionsToCandidatesListening from "views/components/dataSteps/DataContentListening/IntructionsToCandidates";
import TestHeadPhoneAbc from "./components/TestHeadPhoneAbc";
import ModalHelpExam from "../../../components/Modal/ModalHelpExam";
import ModalHide from "../../../components/Modal/ModalHide";
import HandleQuestionProvider from "providers/HandleQuestionProvider";
import EndTest from "../../../components/Exams/EndTest";
import { IELT_TEST } from "../../../interfaces/testType";
import { useCheckTestCode } from "hooks/ielts/useCheckTestCodeHook";
//
import { GetAuthSelector } from "redux/selectors/auth";
import { RouteBase } from "constants/routeUrl";
import LoadingPage from "components/Loading";
//
const styleListRule = {
  padding: "0px 0px 24px 60px",
};
const stepRuleExam = {
  typeExam: "Listening",
  time: "Approximately 30 minutes",
  informationsForCandidates: <InformationForCandidatesListening styleListRule={styleListRule} />,
  intructionsToCandidates: <IntructionsToCandidatesListening styleListRule={styleListRule} />,
};

const containerSteps = {
  pt: "16px",
  background: "#dbe5f5",
  height: "100%",
};
const styleModal = {
  width: "770px",
  padding: "10px !important",
};
// !type
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
  //! State

  const [isOpenModalHelp, setIsOpenModalHelp] = React.useState(false);
  const [isOpenModalHide, setIsOpenModalHide] = React.useState(false);
  const { step, handler } = useStepExam();
  const { mutateAsync: updateIeltsListening, isLoading } = useUpdateIeltsListeningTest();
  const testCode = useMemo(() => {
    return localStorage.getItem("testCode");
  }, []);
  const history = useHistory();

  //! Function
  const auth = GetAuthSelector();
  const user = auth?.user?.user;
  console.log("user", user);

  const handleSubmitForm = async (values: any) => {
    const answers = values.answers.filter((el: any) => {
      return el.questionId && el.studentAnswer;
    });
    const body = { values: { answers }, testCode };
    await updateIeltsListening(body, {
      onSuccess: () => {
        localStorage.setItem("LISTENING", "true");
        history.push(RouteBase.IeltsReading);
      },
    });
  };

  const handleOpenModalHelp = useCallback(() => {
    setIsOpenModalHelp(true);
  }, []);
  const handleCloseModalHelp = () => {
    setIsOpenModalHelp(false);
  };
  //
  const handleOpenModalHide = useCallback(() => {
    setIsOpenModalHide(true);
  }, []);
  const handleCloseModalHide = () => {
    setIsOpenModalHide(false);
  };
  //
  const timeExam = 1800000;
  // useCheckTestCode(Number(testCode));

  //! Render
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Formik initialValues={initialValues()} enableReinitialize onSubmit={(values) => handleSubmitForm(values)}>
      {(formik) => {
        return (
          <Form>
            <Box sx={{ height: "100vh", overflow: "hidden" }}>
              <Header
                handleOpenModalHelp={handleOpenModalHelp}
                handleOpenModalHide={handleOpenModalHide}
                numberStep={TypeStepExamEnum.STEP4}
                timeExam={timeExam}
              />

              <Box sx={containerSteps}>
                {step === TypeStepExamEnum.STEP1 && <DetailUser user={user} />}
                {step === TypeStepExamEnum.STEP2 && <TestHeadPhoneAbc />}
                {step === TypeStepExamEnum.STEP3 && (
                  <RuleExam stepRuleExam={stepRuleExam} nextStep={TypeStepExamEnum.STEP4} />
                )}
                {step === TypeStepExamEnum.STEP4 && <ExamTest />}
                {step === TypeStepExamEnum.STEP5 && <EndTest test={IELT_TEST.LISTENING} />}
              </Box>
            </Box>
            {isOpenModalHelp && (
              <ModalHelpExam
                open={isOpenModalHelp}
                styleModal={styleModal}
                handleCloseModal={handleCloseModalHelp}
                typeExam={TypeExam.LISTENING}
              />
            )}
            {isOpenModalHide && (
              <ModalHide open={isOpenModalHide} styleModal={styleModal} handleCloseModal={handleCloseModalHide} />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

const IeltsListeningRoot = () => {
  return (
    <HandleQuestionProvider>
      <StepExamProvider>
        <IeltsListening />
      </StepExamProvider>
    </HandleQuestionProvider>
  );
};

export default IeltsListeningRoot;
