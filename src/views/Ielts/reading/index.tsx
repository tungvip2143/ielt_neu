import EndTest from "components/Exams/EndTest";
import { TypeExam, TypeStepExamEnum } from "constants/enum";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import React, { useCallback, useMemo } from "react";
//
import { Box } from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import { useFinishIeltsSkill, useUpdateIeltsReadingTest } from "hooks/ielts/useIelts";
import { IELT_TEST } from "interfaces/testType";
import Header from "views/Ielts/Header/Header";
//
import { useGetTestCode } from "hooks/ielts/useGetTestCodeHook";
import InformationForCandidates from "views/components/dataSteps/DataContentReading/InformationForCandidates";
import IntructionsToCandidates from "views/components/dataSteps/DataContentReading/IntructionsToCandidates";
import ModalHelpExam from "../../../components/Modal/ModalHelpExam";
import ModalHide from "../../../components/Modal/ModalHide";
import DetailUser from "../../components/DetailUser/DetailUser";
import RuleExam from "../../components/RuleExam/RuleExam";
import IeltsReadingContainer from "components/Exams/components/Step2ExamContent/Step2ExamContent";
import cacheService from "services/cacheService";
import { rulesdetailExam } from "../../../constants/constants";
import { makeStyles } from "@mui/styles";

//
const styleListRule = {
  padding: "0px 0px 24px 60px",
};
const stepRuleExam = {
  typeExam: rulesdetailExam.reading.title,
  time: rulesdetailExam.reading.timeExam,
  informationsForCandidates: <InformationForCandidates styleListRule={styleListRule} />,
  intructionsToCandidates: <IntructionsToCandidates styleListRule={styleListRule} />,
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      height: "100vh",
      overflow: "hidden",
    },
    containerSteps: {
      // paddingTop: "16px",
      background: theme.custom?.background.exam,
      height: "100%",
    },
  };
});

const IeltsReading = () => {
  // !State
  const [isOpenModalHelp, setIsOpenModalHelp] = React.useState(false);
  const [isOpenModalHide, setIsOpenModalHide] = React.useState(false);
  const classes = useStyles();
  const { step, handler } = useStepExam();
  const { mutateAsync: submitIeltsReadingTest } = useUpdateIeltsReadingTest();
  const { mutateAsync: ieltsReadingFinish } = useFinishIeltsSkill();
  const { testCode } = useGetTestCode();

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

  const handleOpenModalHide = useCallback(() => {
    setIsOpenModalHide(true);
  }, []);
  const handleCloseModalHide = () => {
    setIsOpenModalHide(false);
  };

  const styleModal = {
    width: "770px",
    padding: "10px !important",
  };

  const dataCache = cacheService.getDataCache();
  const { LEFT_TIME } = dataCache;
  const timeExam = LEFT_TIME ? Number(LEFT_TIME) : 3600000;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik: any) => (
        <Form>
          <Box className={classes.container}>
            <Header
              handleOpenModalHelp={handleOpenModalHelp}
              handleOpenModalHide={handleOpenModalHide}
              numberStep={TypeStepExamEnum.STEP3}
              timeExam={timeExam}
            />

            <Box className={classes.containerSteps}>
              {step === TypeStepExamEnum.STEP1 && <DetailUser />}
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
