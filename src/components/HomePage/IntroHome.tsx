//
import Grid from "@mui/material/Grid";
import introRight from "assets/image/home/intro-home.webp";
import ButtonCommon from "components/Button/ButtonCommon";
import CommonStyles from "components/CommonStyles";
const toffl = {
  background: "",
  width: "49%",
  mr: "10px",
};
const ielts = {
  background: "red",
  width: "49%",
};
const IntroHome = () => {
  // ! State
  // ! Render
  return (
    <Grid container sx={{ alignItems: "center", justifyContent: "space-between", padding: "100px 0" }}>
      <Grid item xs={12} md={12} lg={5}>
        <CommonStyles.Typography sx={{ paddingBottom: "30px" }} variant="titleIntroPage">
          Getting Ready for TOEFL® or IELTS™ ?
        </CommonStyles.Typography>

        <CommonStyles.Typography variant="subIntroPage" component="p">
          Try a full TOEFL® practice test or an IELTS™ writing & speaking test. See your scores before test day.
        </CommonStyles.Typography>
        <ButtonCommon.ButtonFullBg sx={toffl}>FREE TOEFL TEST</ButtonCommon.ButtonFullBg>
        <ButtonCommon.ButtonFullBg sx={ielts}>FREE IELTS TEST</ButtonCommon.ButtonFullBg>
      </Grid>

      <Grid item xs={12} md={12} lg={6}>
        <img style={{ width: "100%" }} src={introRight} alt="" className="" />
      </Grid>
    </Grid>
  );
};

export default IntroHome;
