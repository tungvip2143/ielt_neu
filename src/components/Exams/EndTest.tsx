//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
//
import Text from "components/Typography/index";
import { authActions } from "redux/creators/modules/auth";
import useSagaCreators from "hooks/useSagaCreators";
//
import ButtonStartTest from "components/Button/ButtonStartTest";
import LoadingPage from "components/Loading";
import { useFinishIeltsTest } from "hooks/ielts/useIelts";
import { useHistory } from "react-router-dom";

import { RouteBase } from "../../constants/routeUrl";
import { useGetTestCode } from "hooks/ielts/useGetTestCodeHook";
import cacheService from "services/cacheService";
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
  const { dispatch } = useSagaCreators();

  // !Hook
  const history = useHistory();
  const { mutateAsync: finishIeltsTest, isLoading: ieltsFinishLoading } = useFinishIeltsTest();
  const { testCode } = useGetTestCode();

  const handleEndTest = async () => {
    try {
      await finishIeltsTest({ testCode });
      // history.push(RouteBase.Login);
      dispatch(authActions.logout);
      localStorage.removeItem("testCode");
    } catch (err) {
      console.log(err);
    }
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
