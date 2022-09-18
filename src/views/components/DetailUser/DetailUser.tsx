import { Box } from "@mui/system";
import ImgUser from "assets/image/exam/logo-user.png";
//
import { TypeStepExamEnum } from "constants/enum";
import FooterSubmit from "../FooterSubmit/FooterSubmit";
import HelpFooter from "../HelpFooter/HelpFooter";
import Title from "../Title/Title";
import Container from "../Container/Container";
import ImgHelp from "assets/image/exam/help.png";
import { format } from "date-fns";
import { warningDetailUser, textBtnSubmit, textHeaderModal } from "../../../constants/constants";
import { makeStyles } from "@mui/styles";
import { useMemo } from "react";
import authServices from "services/authServices";
//! type
interface Props {}

const useStyles = makeStyles((theme) => {
  return {
    container: {
      ...theme.custom?.flexBox.flexJusCenter,
      paddingTop: "60px",
    },
    introduceUser: {
      margin: "5px 0",
    },
  };
});
const DetailUser = (props: Props) => {
  //! State

  const classes = useStyles();

  const nextStep = TypeStepExamEnum.STEP2;
  const user: any = useMemo(() => {
    const { user } = authServices.getUserLocalStorage();
    return user;
  }, []);

  //! Render
  return (
    <Box className={classes.container}>
      <Box>
        <Title image={ImgUser} text={textHeaderModal.confirmDetail} />
        <Container>
          <p className={classes.introduceUser}>Student code : {user?.username}</p>
          <HelpFooter textHelp={warningDetailUser.checkInformation} image={ImgHelp} />
          <FooterSubmit textBtn={textBtnSubmit.detailUser} nextStep={nextStep} />
        </Container>
      </Box>
    </Box>
  );
};

export default DetailUser;
