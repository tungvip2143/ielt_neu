import LoadingPage from "components/Loading";
import { useIeltsListening, useIeltsSpeaking } from "hooks/ielts/useIelts";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const ExamTest = (props: Props) => {
  // !State
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useIeltsSpeaking(testCode);
  console.log("data", data);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <div>ExamTest</div>;
};

export default ExamTest;
