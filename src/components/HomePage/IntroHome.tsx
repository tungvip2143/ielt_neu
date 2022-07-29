//
import ButtonLarge from "components/Button/ButtonLarge";
import ButtonLargeRed from "components/Button/ButtonLargeRed";

//
import Grid from "@mui/material/Grid";
import Text from "components/Typography/index";
//
import introRight from "assets/image/home/intro-home.webp";
const IntroHome = () => {
  return (
    <Grid container sx={{ alignItems: "center", justifyContent: "space-between", padding: "100px 0" }}>
      <Grid item xs={12} md={5}>
        <Text.TitleIntroPage sx={{ paddingBottom: "30px" }}>Getting Ready for TOEFL® or IELTS™ ?</Text.TitleIntroPage>
        <Text.SubIntroPage>
          Try a full TOEFL® practice test or an IELTS™ writing & speaking test. See your scores before test day.
        </Text.SubIntroPage>
        <ButtonLarge>FREE TOEFL TEST</ButtonLarge>
        <ButtonLargeRed>FREE IELTS TEST</ButtonLargeRed>
      </Grid>
      <Grid item xs={12} md={6}>
        <img style={{ width: "100%" }} src={introRight} alt="" className="" />
      </Grid>
    </Grid>
  );
};

export default IntroHome;
