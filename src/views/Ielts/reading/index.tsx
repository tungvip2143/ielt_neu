import EndTest from "components/Exams/EndTest";
import ExamTest from "components/Exams/StartDoingHomework";
import { TypeExam, TypeStepExamEnum } from "constants/enum";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import React, { useCallback } from "react";
//
import { Box } from "@mui/material";
//
import LoadingPage from "components/Loading";
import { Form, Formik } from "formik";
import { useFinishIeltsSkill, useIeltsReading, useUpdateIeltsReadingTest } from "hooks/ielts/useIelts";
import { IELT_TEST } from "interfaces/testType";
import Header from "views/Ielts/Header/Header";
//
import { RouteBase } from "constants/routeUrl";
import { useCheckTestCode } from "hooks/ielts/useCheckTestCodeHook";
import { useGetTestCode } from "hooks/ielts/useGetTestCodeHook";
import { useHistory } from "react-router-dom";
import InformationForCandidates from "views/components/dataSteps/DataContentReading/InformationForCandidates";
import IntructionsToCandidates from "views/components/dataSteps/DataContentReading/IntructionsToCandidates";
import ModalHelpExam from "../../../components/Modal/ModalHelpExam";
import ModalHide from "../../../components/Modal/ModalHide";
import DetailUser from "../../components/DetailUser/DetailUser";
import RuleExam from "../../components/RuleExam/RuleExam";
import { GetAuthSelector } from "redux/selectors/auth";
//
const styleListRule = {
  padding: "0px 0px 24px 60px",
};
const stepRuleExam = {
  typeExam: "Reading",
  time: "1 hour",
  informationsForCandidates: <InformationForCandidates styleListRule={styleListRule} />,
  intructionsToCandidates: <IntructionsToCandidates styleListRule={styleListRule} />,
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
  const { data } = props;
  const [isOpenModalHelp, setIsOpenModalHelp] = React.useState(false);
  const [isOpenModalHide, setIsOpenModalHide] = React.useState(false);
  const history = useHistory();

  const { step, handler } = useStepExam();
  const { mutateAsync: submitIeltsReadingTest } = useUpdateIeltsReadingTest();
  const { mutateAsync: ieltsReadingFinish } = useFinishIeltsSkill();
  const { testCode } = useGetTestCode();

  // const handleSubmit = async (values: any) => {
  //   const answers = values.answers.filter((el: any) => {
  //     return el.questionId && el.studentAnswer;
  //   });
  //   const body = { values: { answers }, testCode };
  //   await submitIeltsReadingTest(body, {
  //     onSuccess: () => {
  //       history.push(RouteBase.IeltsWriting);
  //     },
  //   });
  // };
  //!
  const auth = GetAuthSelector();
  const user = auth?.user?.user;
  //
  const handleSubmit = async () => {
    await ieltsReadingFinish({ testCode, skill: "reading" });
    handler?.setStep && handler.setStep(TypeStepExamEnum.STEP4);
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
  };
  //
  const timeExam = 3600000;

  return (
    <Formik initialValues={initialValues()} onSubmit={handleSubmit}>
      {(formik: any) => (
        <Form>
          <Box sx={{ height: { xs: "", lg: "100vh" }, overflow: { Xs: "", lg: "hidden" } }}>
            <Header
              handleOpenModalHelp={handleOpenModalHelp}
              handleOpenModalHide={handleOpenModalHide}
              numberStep={TypeStepExamEnum.STEP3}
              timeExam={timeExam}
            />
            <Box sx={containerSteps}>
              {step === TypeStepExamEnum.STEP1 && <DetailUser user={user} />}
              {step === TypeStepExamEnum.STEP2 && (
                <RuleExam stepRuleExam={stepRuleExam} nextStep={TypeStepExamEnum.STEP3} />
              )}
              {step === TypeStepExamEnum.STEP3 && <ExamTest test={IELT_TEST.READING} data={data} />}
              {step === TypeStepExamEnum.STEP4 && <EndTest test={IELT_TEST.READING} />}
            </Box>
          </Box>

          {isOpenModalHelp && (
            <ModalHelpExam
              open={isOpenModalHelp}
              styleModal={styleModal}
              handleCloseModal={handleCloseModalHelp}
              typeExam={TypeExam.READING}
            />
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
  const { testCode } = useGetTestCode();
  const { data, isLoading } = useIeltsReading(testCode);
  const history = useHistory();

  if (isLoading) {
    return <LoadingPage />;
  }
  useCheckTestCode(Number(testCode));

  return <IeltsReading data={data?.data?.data} testCode={Number(testCode)} />;
};

const IeltsListeningRoot = () => {
  return (
    <StepExamProvider>
      <IeltsReadingContainer />
    </StepExamProvider>
  );
};

export default IeltsListeningRoot;
