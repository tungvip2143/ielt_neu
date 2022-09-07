import React, { useCallback, useEffect, useMemo } from "react";
import ExamTest from "./components/ExamTest";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum, TypeExam, TimeExamLeft } from "constants/enum";
//
import { Box, Button } from "@mui/material";
//
import Header from "views/Ielts/Header/Header";
import { Form, Formik } from "formik";
import { useFinishIeltsSkill, useUpdateIeltsListeningTest } from "hooks/ielts/useIelts";
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
//
import { GetAuthSelector } from "redux/selectors/auth";
import { RouteBase } from "constants/routeUrl";
import LoadingPage from "components/Loading";
import { rulesdetailExam } from "../../../constants/constants";
//
import { makeStyles } from "@mui/styles";
import { useGetTimeExam } from "hooks/ielts/useGetTimeExam";
import { useGetExamValueFromLocalStorage } from "hooks/ielts/useGetExamValueFromLocalStorage";
import cacheService from "services/cacheService";
import { useConfirmCloseBrowser } from "hooks/ielts/useCloseTagConfirmHook";
//! css
const useStyles = makeStyles((theme) => {
  return {};
});
const stepRuleExam = {
  typeExam: rulesdetailExam.listening.title,
  time: rulesdetailExam.listening.timeExam,
  informationsForCandidates: <InformationForCandidatesListening />,
  intructionsToCandidates: <IntructionsToCandidatesListening />,
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

const IeltsListening = (props: IeltsListeningProps) => {
  //! State

  const [isOpenModalHelp, setIsOpenModalHelp] = React.useState(false);
  const [isOpenModalHide, setIsOpenModalHide] = React.useState(false);
  const { step, handler } = useStepExam();
  const { mutateAsync: updateIeltsListening, isLoading } = useUpdateIeltsListeningTest();
  const { mutateAsync: updateIeltsListeningFinish, isLoading: listeningFinishLoading } = useFinishIeltsSkill();

  // useConfirmCloseBrowser();
  const history = useHistory();
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

  //! Function
  const auth = GetAuthSelector();
  const user = auth?.user?.user;

  const handleSubmitForm = async (values: any) => {
    const testCode = localStorage.getItem("testCode");
    const answers = values.answers.filter((el: any) => {
      return el.questionId && el.studentAnswer;
    });
    // console.log("testCode", testCode);
    const body = { values: { answers }, testCode };
    await updateIeltsListening(body, {
      onSuccess: async () => {
        cacheService.clearCacheData();
        await updateIeltsListeningFinish(
          { testCode, skill: "listening" },
          {
            onSuccess: () => {
              // cacheService.cache("skill", "READING");
            },
          }
        );
      },
    });
    history.push(RouteBase.IeltsReading);
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
  const dataCache = cacheService.getDataCache();
  const { LEFT_TIME } = dataCache;
  const timeExam = useMemo(() => {
    return LEFT_TIME ? Number(LEFT_TIME) : 1800000;
  }, []);

  //! Render
  if (isLoading || listeningFinishLoading) {
    return <LoadingPage />;
  }
  return (
    <Formik initialValues={initialValues} enableReinitialize onSubmit={(values) => handleSubmitForm(values)}>
      {(formik) => {
        return (
          <Form>
            <Box sx={{ height: "100vh", overflow: "hidden" }}>
              <Header
                handleOpenModalHelp={handleOpenModalHelp}
                handleOpenModalHide={handleOpenModalHide}
                numberStep={TypeStepExamEnum.STEP4}
                timeExam={timeExam}
                // handleSubmitWhenEndedTime={() => handleSubmitForm(formik.values)}
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
