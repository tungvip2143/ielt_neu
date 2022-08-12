//
import Box from "@mui/material/Box";
//
//
import LoadingPage from "components/Loading";
import ReviewContainer from "components/Review/Components/ReviewContainer";
import { useGetReadingResultByTestCode } from "hooks/review/useIeltsReview";
import { useSelector } from "react-redux";
//
// !TYPE
interface Props {
  typeExam: any;
  title: any;
}
const BoxExam = () => {
  const boxExam = {
    p: "24px 32px",
    borderRadius: "20px",
    height: "630px",
    overflowY: "scroll",
    width: { xs: "100%", md: "50%" },
    border: "1px solid #ccc",
  };

  return <Box sx={boxExam}>quang</Box>;
};
const ReviewReading = (typeExam: Props) => {
  // !State
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useGetReadingResultByTestCode(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ReviewContainer typeExam={typeExam}>
      <BoxExam />
      <BoxExam />
    </ReviewContainer>
  );
};

export default ReviewReading;
