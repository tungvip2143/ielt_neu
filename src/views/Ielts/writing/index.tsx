import EndTest from "components/Exams/EndTest";
import { TypeStepExamEnum } from "constants/enum";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import React, { useCallback } from "react";
import { Box } from "@mui/material";
import LoadingPage from "components/Loading";
import { Form, Formik } from "formik";
import { useIeltsWritting, useUpdateIeltsWriting } from "hooks/ielts/useIelts";
import { IELT_TEST } from "interfaces/testType";
import Header from "views/Ielts/Header/Header";
import { RouteBase } from "constants/routeUrl";
import { useCheckTestCode } from "hooks/ielts/useCheckTestCodeHook";
import { useGetTestCode } from "hooks/ielts/useGetTestCodeHook";
import HandleQuestionProvider from "providers/HandleQuestionProvider";
import { useHistory } from "react-router-dom";
import ModalHelpExam from "../../../components/Modal/ModalHelpExam";
import ModalHide from "../../../components/Modal/ModalHide";
import InformationForCandidates from "../../components/dataSteps/DataContentSpeaking/InformationForCandidates";
import IntructionsToCandidates from "../../components/dataSteps/DataContentSpeaking/IntructionsToCandidates";
import DetailUser from "../../components/DetailUser/DetailUser";
import RuleExam from "../../components/RuleExam/RuleExam";
import StepExamWriting from "./component/StepExamWriting";

export interface IeltsReadingProps {}

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

const initialsValues = {
  answers: [
    {
      questionId: "",
      studentAnswer: "",
    },
  ],
};
const stepRuleExam = {
  typeExam: "Writing",
  time: "1 hour",
  informationsForCandidates: <InformationForCandidates />,
  intructionsToCandidates: <IntructionsToCandidates />,
};

const IeltsWriting = (props: IeltsReadingProps) => {
  const [isOpenModalHelp, setIsOpenModalHelp] = React.useState(false);
  const [isOpenModalHide, setIsOpenModalHide] = React.useState(false);
  const history = useHistory();

  const { step, handler } = useStepExam();
  const { testCode } = useGetTestCode();
  const { data, isLoading } = useIeltsWritting(testCode);
  const { mutateAsync: updateIeltsWriting } = useUpdateIeltsWriting();

  const handleSubmit = async (values: any) => {
    await updateIeltsWriting(
      { values, testCode },
      {
        onSuccess: () => {
          history.push(RouteBase.IeltsSpeaking);
        },
      }
    );
  };

  //
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
  useCheckTestCode(Number(testCode));
  if (isLoading) {
    return <LoadingPage />;
  }

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
            <Header
              handleOpenModalHelp={handleOpenModalHelp}
              handleOpenModalHide={handleOpenModalHide}
              numberStep={TypeStepExamEnum.STEP3}
            />
            <Box sx={containerSteps}>
              {step === TypeStepExamEnum.STEP1 && <DetailUser />}
              {step === TypeStepExamEnum.STEP2 && (
                <RuleExam stepRuleExam={stepRuleExam} nextStep={TypeStepExamEnum.STEP3} />
              )}
              {step === TypeStepExamEnum.STEP3 && <StepExamWriting test={IELT_TEST.WRITING} data={data?.data?.data} />}
              {step === TypeStepExamEnum.STEP4 && <EndTest test={IELT_TEST.WRITING} />}
            </Box>

            {isOpenModalHelp && (
              <ModalHelpExam open={isOpenModalHelp} styleModal={styleModal} handleCloseModal={handleCloseModalHelp} />
            )}
            {isOpenModalHide && (
              <ModalHide open={isOpenModalHide} styleModal={styleModal} handleCloseModal={handleCloseModalHide} />
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const IeltsWritingRoot = () => {
  return (
    <HandleQuestionProvider>
      <StepExamProvider>
        <IeltsWriting />
      </StepExamProvider>
    </HandleQuestionProvider>
  );
};

export default IeltsWritingRoot;
