//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
//
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Card from "@mui/material/Card";
//
import ButtonOutLineCommon from "components/Button/ButtonOutLineCommon";
import Text from "components/Typography/index";

//
import LockIcon from "@mui/icons-material/Lock";

import { useFormikContext } from "formik";
import { useIeltsTestCode } from "hooks/ielts/useIelts";
import useSagaCreators from "hooks/useSagaCreators";
import { useHistory } from "react-router-dom";
import { IeltsActions } from "redux/creators/modules/ielts";
import { useCallback, useEffect } from "react";
import { isEmpty } from "lodash";

const CardList = {
  borderRadius: "15px",
  m: "0 10px",
  p: { xs: "20px 20px", sm: "20px 30px", md: "20px 30px", lg: "32px 24px 24px 32px" },
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  cursor: "pointer",
  position: "relative",
  marginBottom: { xs: "20px", lg: "0" },
};
const contentList = {
  display: { xs: "flex", sm: "flex", md: "flex", lg: "block" },
  justifyContent: { xs: "space-between", lg: "" },
};
const lock = {
  display: { xs: "flex", lg: "none" },
  position: "absolute",
  background: { xs: "#fff", lg: "0" },
  opacity: "0.9",
  width: "100%",
  height: "100%",
  zIndex: 999,
  borderRadius: "15px",
  top: 0,
  left: 0,
  padding: { xs: "10px 10px", md: "30px 50px" },
};
interface Exam {
  exam: {
    id: number;
    typeExam: string;
    timeExam: string;
    nameExam: string;
    image: string;
    hoverColor: string;
    path: string;
    skill?: string;
  };
  onClick?: any;
  onSelectExam: boolean;
  id?: any;
}
const CardIlets = ({ exam, onClick, onSelectExam, id }: Exam) => {
  console.log("idCard", id);
  //! State
  const { dispatch } = useSagaCreators();
  const { values, handleSubmit }: any = useFormikContext();

  // !Hook
  const { isLoading, mutateAsync: createTestCode } = useIeltsTestCode();
  const handleBackIeltsSelection = () => {
    onClick();
    if (id === 1) {
      history.push("/ielts/listening");
    } else if (id === 2) {
      history.push("/ielts/reading");
    } else if (id === 3) {
      history.push("/ielts/writing");
    } else if (id === 4) {
      history.push("/ielts/speaking");
    }
  };
  const history = useHistory();

  const examinationId = useCallback(() => {
    localStorage.setItem("examinationId", "63083406de9e9ae9edd96b5d");
  }, []);

  const handleShowModal = () => {
    onClick();
  };
  // !Function
  const handleTest = async () => {
    await createTestCode(
      { examination: "63083406de9e9ae9edd96b5d" },
      {
        onSuccess: (response) => {
          dispatch(IeltsActions.saveTestCode, { testCode: response?.data?.data?.testCode });
          handleBackIeltsSelection();
        },
        onError: (err: any) => {
          if (err.response.data.statusCode === 401) {
            history.push("/login");
          }
        },
      }
    );
  };

  //! Render
  return (
    <Grid item xs={12} sm={12} md={12} lg={3} sx={{ position: "relative" }} onClick={handleTest}>
      <Card sx={CardList} className={exam.hoverColor}>
        {/* <LinkCustom to={exam.path}> */}
        <Box sx={contentList}>
          <Box>
            <Box sx={{ maxWidth: { xs: "100%", lg: "112px" }, pb: "15px" }}>
              <Text.CardTitle>{exam.typeExam}</Text.CardTitle>
            </Box>
            <Stack direction="row" spacing={1} sx={{ pb: "25px" }}>
              <AccessAlarmIcon sx={{ color: "#36373B" }} />
              <Text.SubCardTitle>{exam.timeExam}</Text.SubCardTitle>
            </Stack>
            <ButtonOutLineCommon>{exam.nameExam}</ButtonOutLineCommon>
          </Box>
          <Box sx={{ width: { xs: "100px", sm: "120px", md: "150px", lg: "248px" } }}>
            <img style={{ transform: "translateX(-20px)", width: "100%" }} src={exam.image} alt="" />
          </Box>
        </Box>
        <Box sx={lock}>
          <Stack
            sx={{ width: "100%", alignItems: "center", justifyContent: "space-between" }}
            direction="row"
            spacing={2}
          >
            <Box sx={{ width: { xs: "90%", md: "60%", lg: "" } }}>
              <Text.Sub20Bold sx={{ mb: "20px" }}>Access from PC, please.</Text.Sub20Bold>
              <Text.DescSmallCard>We currently do not support tests for mobile and tablet.</Text.DescSmallCard>
            </Box>
            <Box>
              <LockIcon sx={{ fontSize: { xs: "80px", sm: "80px", md: "100px" }, color: "#ccc", zIndex: 10 }} />
            </Box>
          </Stack>
        </Box>
        {/* </LinkCustom> */}
      </Card>
    </Grid>
  );
};

export default CardIlets;
{
  /* <Box></Box> */
}
