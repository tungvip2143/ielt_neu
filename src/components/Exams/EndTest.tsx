//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
//
import Text from "components/Typography/index";

import ButtonStartTest from "components/Button/ButtonStartTest";
import LoadingPage from "components/Loading";
import { useFinishIeltsTest } from "hooks/ielts/useIelts";
import { useHistory } from "react-router-dom";
import { useGetTestCode } from "hooks/ielts/useGetTestCodeHook";
import useSagaCreators from "hooks/useSagaCreators";
import { authActions } from "redux/creators/modules/auth";

const card = {
  p: "48px 32px",
  width: { xs: "90%", md: "80%" },
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
  // !Hook
  const history = useHistory();
  const { mutateAsync: finishIeltsTest, isLoading: ieltsFinishLoading } = useFinishIeltsTest();
  const { dispatch } = useSagaCreators();

  const { testCode } = useGetTestCode();

  const handleEndTest = async () => {
    await finishIeltsTest(
      { testCode },
      {
        onSuccess: () => {
          dispatch(authActions.logout);
          history.push("/login");
        },
      }
    );
  };

  if (ieltsFinishLoading) {
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
