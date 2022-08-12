//
import Box from "@mui/material/Box";
import CardExercise from "components/Card/CardExercise";
import Step2ExamContent from "components/Exams/components/Step2ExamContent/Step2ExamContent";
//
//
import LoadingPage from "components/Loading";
import ReviewContainer from "components/Review/Components/ReviewContainer";
import { Form, Formik } from "formik";
import { useGetReadingResultByTestCode } from "hooks/review/useIeltsReview";
import { ACTION, IELT_TEST } from "interfaces/testType";
import { useSelector } from "react-redux";

const BoxExam = () => {
  const boxExam = {
    p: "24px 32px",
    borderRadius: "20px",
    height: "630px",
    overflowY: "scroll",
    width: { xs: "100%", md: "50%" },
    border: "1px solid #ccc",
  };

  return <Box sx={boxExam}></Box>;
};

const ReviewReading = () => {
  // !State
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useGetReadingResultByTestCode(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Formik initialValues={{}} onSubmit={() => console.log("hello")}>
      {(formik: any) => (
        <Form>
          {/* <ReviewContainer> */}
          <Step2ExamContent action={ACTION.REVIEW} test={IELT_TEST.READING} data={data?.data?.data?.reading} />
          {/* </ReviewContainer> */}
        </Form>
      )}
    </Formik>
  );
};

export default ReviewReading;
