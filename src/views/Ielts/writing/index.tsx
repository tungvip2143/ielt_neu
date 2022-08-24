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
//
import { useHistory } from "react-router-dom";
import ModalExit from "components/Modal/ModalExit";
import DetailUser from "../../components/DetailUser/DetailUser";
import RuleExam from "../../components/RuleExam/RuleExam";
import InformationForCandidates from "../../components/dataSteps/DataContentWriting/InformationForCandidates";
import IntructionsToCandidates from "../../components/dataSteps/DataContentWriting/IntructionsToCandidates";
import ModalHelpExam from "../../../components/Modal/ModalHelpExam";

export interface IeltsReadingProps {}

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
  const [open, setOpen] = React.useState<boolean>(false);
  const [isOpenModalHelp, setIsOpenModalHelp] = React.useState(false);

  const { step, handler } = useStepExam();
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);

  const { data, isLoading } = useIeltsWritting(testCode);
  const { mutateAsync: updateIeltsWriting } = useUpdateIeltsWriting();
  const handleShowModal = React.useCallback(() => {
    setOpen(true);
  }, []);
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
  //
  const history = useHistory();

  //

  const handleCloseModal = () => setOpen(false);
  //
  const handleOpenModalHelp = () => {
    setIsOpenModalHelp(true);
  };
  const handleCloseModalHelp = () => {
    setIsOpenModalHelp(false);
  };
  //
  const handleBackIeltsSelection = () => {
    history.push("/ielts");
  };
  //
  const containerSteps = {
    pt: "60px",
    background: "#dbe5f5",
    height: "100%",
  };
  const styleModalExit = {
    padding: "20px",
  };
  const styleModal = {
    width: "770px",
    padding: "10px !important",
    // overflow: "hidden",
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
            <Header onShowModalExit={handleShowModal} handleOpenModalHelp={handleOpenModalHelp} />
            <Box sx={containerSteps}>
              {step === TypeStepExamEnum.STEP1 && <DetailUser />}
              {step === TypeStepExamEnum.STEP2 && <RuleExam stepRuleExam={stepRuleExam} />}
              {step === TypeStepExamEnum.STEP3 && <ExamTest test={IELT_TEST.WRITING} data={data?.data?.data} />}
              {step === TypeStepExamEnum.STEP4 && <EndTest test={IELT_TEST.WRITING} />}
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
