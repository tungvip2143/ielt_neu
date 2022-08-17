import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardExercise from "components/Card/CardExercise";
//
import { useGetSpeakingResultByTestCode } from "hooks/review/useIeltsReview";
import { IELT_TEST } from "interfaces/testType";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { makeStyles } from "@mui/styles";
import LoadingPage from "components/Loading";
import { useParams } from "react-router-dom";
//
interface Props {
  data?: any;
}
//

const SpeakingReview = () => {
  return (
    <>
      <div className="">quang</div>
    </>
  );
};
//
const SpeakingReviewContainer = () => {
  const param = useParams();
  const { testCode }: any = param;
  const { data, isLoading } = useGetSpeakingResultByTestCode(testCode);
  console.log("testCode", data);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <SpeakingReview />
    </>
  );
};

export default SpeakingReviewContainer;
