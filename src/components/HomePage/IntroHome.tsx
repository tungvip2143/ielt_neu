import Grid from "@mui/material/Grid";
import introRight from "assets/image/home/intro-home.webp";
import CommonStyles from "components/CommonStyles";

const IntroHome = () => {
  //! Render
  return (
    <Grid container sx={{ alignItems: "center", justifyContent: "space-between", padding: "100px 0" }}>
      <Grid item xs={12} md={12} lg={5}>
        <CommonStyles.Typography sx={{ paddingBottom: "30px" }} variant="titleIntroPage">
          Getting Ready for TOEFL® or IELTS™ ?
        </CommonStyles.Typography>

        <CommonStyles.Typography variant="subIntroPage" component="p">
          Try a full TOEFL® practice test or an IELTS™ writing & speaking test. See your scores before test day.
        </CommonStyles.Typography>

        <CommonStyles.Button
          sx={{
            width: "48%",
            borderRadius: "12px",
            color: "#fff",
            border: "1px solid rgb(76,128,241)",
            fontWeight: 700,
            fontSize: "16px",
            textTransform: "uppercase",
            background: "rgb(76,128,241)",
            marginRight: "10px",
            "&:hover": {
              backgroundColor: "#fff",
              background: "rgb(17,74,198)",
            },
          }}
        >
          FREE TOEFL TEST
        </CommonStyles.Button>

        <CommonStyles.Button
          sx={{
            // padding: "12px 60px",
            width: "48%",
            borderRadius: "12px",
            color: "#fff",
            border: "1px solid rgb(246,71,90)",
            fontWeight: 700,
            fontSize: "16px",
            textTransform: "uppercase",
            background: "rgb(246,71,90)",
            "&:hover": {
              backgroundColor: "#fff",
              background: "rgb(223,10,49)",
            },
          }}
        >
          FREE IELTS TEST
        </CommonStyles.Button>
      </Grid>

      <Grid item xs={12} md={12} lg={6}>
        <img style={{ width: "100%" }} src={introRight} alt="" className="" />
      </Grid>
    </Grid>
  );
};

export default IntroHome;
