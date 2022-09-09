import { Box } from "@mui/system";
import { themeCssSx } from "../../../ThemeCssSx/ThemeCssSx";
import ImgUser from "assets/image/exam/logo-user.png";
import Text from "../../../components/Typography/index";
//
import { TypeStepExamEnum } from "constants/enum";
import FooterSubmit from "../FooterSubmit/FooterSubmit";
import HelpFooter from "../HelpFooter/HelpFooter";
import Title from "../Title/Title";
import Container from "../Container/Container";
import ImgHelp from "assets/image/exam/help.png";
import { format } from "date-fns";
import { warningDetailUser, textHeaderModal, textBtnSubmit } from "../../../constants/constants";
//
import { makeStyles } from "@mui/styles";
import CommonStyles from "components/CommonStyles";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      ...theme.custom?.flexBox.flexJusCenter,
      marginTop: "60px",
    },
    textDetail: {
      margin: "5px 0 !important",
    },
  };
});
//! type
interface Props {
  user?: any;
}
const DetailUser = (props: Props) => {
  //! State
  const { user } = props;
  const classes = useStyles();

  const nextStep = TypeStepExamEnum.STEP2;
  //
  const handleBrithDay = () => {
    if (user?.fullname) {
      return format(new Date(user?.dob), "dd-MM-yyyy");
    } else {
      return "";
    }
  };

  //! Render
  return (
    <Box className={classes.container}>
      <Box>
        <Title image={ImgUser} text={textHeaderModal.confirmDetail} />
        <Container>
          <CommonStyles.Typography component="p" variant="descMedium" className={classes.textDetail}>
            Name: {user?.fullname}
          </CommonStyles.Typography>
          <CommonStyles.Typography component="p" variant="descMedium" className={classes.textDetail}>
            Date of birth: {handleBrithDay()}
          </CommonStyles.Typography>
          <CommonStyles.Typography component="p" variant="descMedium" className={classes.textDetail}>
            Candidate number: {user?._id}
          </CommonStyles.Typography>
          <HelpFooter textHelp={warningDetailUser.checkInformation} image={ImgHelp} />
          <FooterSubmit textBtn={textBtnSubmit.detailUser} nextStep={nextStep} />
        </Container>
      </Box>
    </Box>
  );
};

export default DetailUser;
