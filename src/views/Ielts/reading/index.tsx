import EndTest from "components/Exams/EndTest";
import ExamTest from "components/Exams/StartDoingHomework";
import { TypeExam, TypeStepExamEnum } from "constants/enum";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import React, { useCallback, useMemo } from "react";
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
import IeltsReadingContainer from "components/Exams/components/Step2ExamContent/Step2ExamContent";
import cacheService from "services/cacheService";
import useSagaCreators from "hooks/useSagaCreators";
import { toast } from "react-toastify";
import { showError } from "helpers/toast";
import { getErrorMsg } from "helpers";
import { useConfirmCloseBrowser } from "hooks/ielts/useCloseTagConfirmHook";
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

const IeltsReading = () => {
  // !State
  const [isOpenModalHelp, setIsOpenModalHelp] = React.useState(false);
  const [isOpenModalHide, setIsOpenModalHide] = React.useState(false);
  const history = useHistory();

  const { step, handler } = useStepExam();
  const { mutateAsync: submitIeltsReadingTest } = useUpdateIeltsReadingTest();
  const { mutateAsync: ieltsReadingFinish } = useFinishIeltsSkill();
  const { testCode } = useGetTestCode();

  const auth = GetAuthSelector();
  const user = auth?.user?.user;
  //

  const genInitialValue = useMemo(() => {
    let value = {
      questionId: "",
      studentAnswer: "",
    };

    let answers = [];
    for (let i = 0; i < 40; i++) {
      answers.push(value);
    }
    return { answers };
  }, []);

  const initialValues: any = useMemo(() => {
    const dataCache = cacheService.getDataCache();
    const { answers } = dataCache;
    return answers ? answers : genInitialValue;
  }, []);

  const handleSubmit = useCallback(async (values: any) => {
    const answers = values.answers.filter((el: any) => {
      return el.questionId && el.studentAnswer;
    });
    try {
      const body = { values: { answers }, testCode };
      await submitIeltsReadingTest(body);
      await ieltsReadingFinish({ testCode, skill: "reading" }).then(() => {
        handler?.setStep && handler.setStep(TypeStepExamEnum.STEP4);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

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

  const dataCache = cacheService.getDataCache();
  const { LEFT_TIME } = dataCache;
  // const timeExam = LEFT_TIME ? Number(LEFT_TIME) : 3600000;
  const timeExam = LEFT_TIME ? Number(LEFT_TIME) : 1800000;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
              {step === TypeStepExamEnum.STEP3 && <IeltsReadingContainer />}
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

const IeltsListeningRoot = () => {
  return (
    <StepExamProvider>
      <IeltsReading />
    </StepExamProvider>
  );
};

export default IeltsListeningRoot;
