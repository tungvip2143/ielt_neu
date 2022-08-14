import React from "react";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
//
import Text from "components/Typography/index";

import ButtonStartTest from "components/Button/ButtonStartTest";
import { useHistory } from "react-router-dom";
import { useFinishIeltsReadingTest, useFinishIeltsWritingTest } from "hooks/ielts/useIelts";
import { useSelector } from "react-redux";
import { IELT_TEST } from "interfaces/testType";
import LoadingPage from "components/Loading";

const card = {
  p: "48px 32px",
  width: { xs: "100%", md: "80%" },
  borderRadius: "16px",
  margin: "0 auto",
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
};
const content = {
  width: { xs: "100%", sm: "90%", md: "660px" },
  margin: "0 auto",
  textAlign: "center",
};

interface Props {
  test?: string;
}

const EndTest = (props: Props) => {
  const { test } = props;
  console.log("test", test);
  // !Hook
  const history = useHistory();
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);

  const { mutateAsync: finishIeltsReading, isLoading: readingLoading } = useFinishIeltsReadingTest();
  const { mutateAsync: finishIeltsWriting, isLoading: writingLoading } = useFinishIeltsWritingTest();
  const typeExam = () => {
    if (test === IELT_TEST.READING) {
      return { type: IELT_TEST.READING };
    } else if (test === IELT_TEST.WRITING) {
      return { type: IELT_TEST.WRITING };
    } else if (test === IELT_TEST.SPEAKING) {
      return { type: IELT_TEST.SPEAKING };
    } else if (test === IELT_TEST.LISTENING) {
      return { type: IELT_TEST.LISTENING };
    }
  };
  // const {}=
  const location = {
    pathname: "/ielts/scores",
    state: typeExam(),
  };
  const handleEndTest = async () => {
    if (test === IELT_TEST.READING) {
      await finishIeltsReading(testCode, {
        onSuccess: () => history.push(location),
      });
    }
    if (test === IELT_TEST.WRITING) {
      await finishIeltsWriting(testCode, {
        onSuccess: () => history.push(location),
      });
    }
  };

  if (readingLoading || writingLoading) {
    return <LoadingPage />;
  }

  return (
    <Card sx={card}>
      <Box sx={content}>
        <Text.Title>You have reached the end of the test</Text.Title>
        <Text.DescSmallCard>All of your answer have been saved.</Text.DescSmallCard>
        <Text.DescSmallCard>Please click the end test button below to finish the test</Text.DescSmallCard>
        <Box sx={{ mt: "50px" }}>
          <ButtonStartTest onClick={handleEndTest}>End Test</ButtonStartTest>
        </Box>
      </Box>
    </Card>
  );
};

export default EndTest;
