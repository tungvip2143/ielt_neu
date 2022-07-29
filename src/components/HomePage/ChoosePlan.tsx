import React, { useState } from "react";
//
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Switch from "@mui/material/Switch";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
//
import CardChoosePlan from "components/Card/CardChoosePlan";
//
import Text from "components/Typography/index";
import { Link } from "react-router-dom";

const ChoosePlan = () => {
  // ! State
  const [isShowSale, isSetShow] = useState(true);
  //
  const hanldeShowSale = (event: any) => {
    isSetShow(event.target.checked);
  };
  const showDescButtonSale = () => {
    if (isShowSale) {
      return "25% DISCOUNTED!";
    } else {
      return "SUBSCRIBE AND GET 25% OFF!";
    }
  };
  console.log(isShowSale);
  const Header = () => {
    return (
      <>
        <Text.CardTitle sx={{ color: "#114AC6" }}>Subscription Pass</Text.CardTitle>
        <Stack direction="row" spacing={1} sx={{ p: "10px 0 0 0" }}>
          <Text.Sub20Bold className="cost-money" sx={{ color: "#114AC6", position: "relative" }}>
            $39,99
          </Text.Sub20Bold>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#DEF876",
              fontWeight: "bold",
              p: "3px 10px",
              background: "#114AC6",
              borderRadius: "5px",
            }}
          >
            25% OFF
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Text.TitleIntroPage sx={{ color: "#114AC6" }}>$29,99</Text.TitleIntroPage>
          <Typography sx={{ fontSize: "14px", color: "#114AC6", fontWeight: "bold", marginTop: "35px !important" }}>
            USD
          </Typography>
        </Stack>
      </>
    );
  };
  const HeaderNoSale = () => {
    return (
      <>
        <Text.CardTitle sx={{ color: "#114AC6" }}>30-Day Pass</Text.CardTitle>

        <Stack direction="row" spacing={1}>
          <Text.TitleIntroPage sx={{ color: "#114AC6" }}>$39,99</Text.TitleIntroPage>
          <Typography sx={{ fontSize: "14px", color: "#114AC6", fontWeight: "bold", marginTop: "35px !important" }}>
            USD
          </Typography>
        </Stack>
      </>
    );
  };
  const Desc = () => {
    return (
      <>
        <Box sx={{ minHeight: "150px" }}>
          <Stack direction="column" spacing={2} sx={{ maxWidth: "250px", mt: "30px !important" }}>
            <Stack direction="row" spacing={1}>
              <CheckCircleIcon sx={{ fontSize: "24px", color: "#80A8FF" }} />
              <Text.Desc14medium>For users who plan to study for more than month</Text.Desc14medium>
            </Stack>
            <Stack direction="row" spacing={1}>
              <CheckCircleIcon sx={{ fontSize: "24px", color: "#80A8FF" }} />
              <Text.Desc14medium>Access to 12 full mock test</Text.Desc14medium>
            </Stack>
            <Stack direction="row" spacing={1}>
              <CheckCircleIcon sx={{ fontSize: "24px", color: "#80A8FF" }} />
              <Text.Desc14medium>Recurring billing every month</Text.Desc14medium>
            </Stack>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: "20px !important" }}>
          <Switch defaultChecked color="info" checked={isShowSale} onChange={hanldeShowSale} />
          <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "#114AC6" }}>
            {showDescButtonSale()}
          </Typography>
        </Stack>
      </>
    );
  };
  //
  const HeaderRight = () => {
    return (
      <>
        <Text.CardTitle sx={{ color: "#114AC6" }}>7-Day Pass</Text.CardTitle>
        <Stack direction="row" spacing={1} sx={{ p: "10px 0 0 0" }}>
          <Text.Sub20Bold sx={{ color: "#114AC6" }}>$19,99</Text.Sub20Bold>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#DEF876",
              fontWeight: "bold",
              p: "3px 10px",
              background: "#114AC6",
              borderRadius: "5px",
            }}
          >
            25% OFF
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Text.TitleIntroPage sx={{ color: "#114AC6" }}>$14,99</Text.TitleIntroPage>
          <Typography sx={{ fontSize: "14px", color: "#114AC6", fontWeight: "bold", marginTop: "35px !important" }}>
            USD
          </Typography>
        </Stack>
      </>
    );
  };

  const DescRight = () => {
    return (
      <>
        <Box sx={{ minHeight: "150px" }}>
          <Stack direction="column" spacing={2} sx={{ maxWidth: "250px", mt: "30px !important" }}>
            <Stack direction="row" spacing={1}>
              <CheckCircleIcon sx={{ fontSize: "24px", color: "#80A8FF" }} />
              <Text.Desc14medium>For users who need last minute TOEFL practice</Text.Desc14medium>
            </Stack>
            <Stack direction="row" spacing={1}>
              <CheckCircleIcon sx={{ fontSize: "24px", color: "#80A8FF" }} />
              <Text.Desc14medium>Access to 12 full mock test</Text.Desc14medium>
            </Stack>
          </Stack>
        </Box>
        <Link to="/">
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: "20px !important",
              height: "38px",
              // background: "rgba(255, 255, 255, 0.5)",
              // backdropFilter: "blur(4px)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text.Desc14medium sx={{ color: "#114AC6" }}>FREE TRIAL</Text.Desc14medium>
            <ChevronRightIcon sx={{ color: "#114AC6" }} />
          </Stack>
        </Link>
      </>
    );
  };
  //
  // ! Render
  return (
    <Box sx={{ p: "100px 0" }}>
      <Box sx={{ textAlign: "center" }}>
        <Text.TitleIntroPage>Choose the best plan for you</Text.TitleIntroPage>
        <Text.DescNormal>Join the 2,500,000+ students currently studying with TestGlider</Text.DescNormal>
      </Box>
      <Grid container sx={{ justifyContent: "center", mt: "80px" }}>
        <CardChoosePlan
          header={<Header />}
          headerNoSale={<HeaderNoSale />}
          desc={<Desc />}
          isShowSale={isShowSale}
          className="img-choose-plan-left"
        />
        <CardChoosePlan
          header={<HeaderRight />}
          desc={<DescRight />}
          isShowSale={true}
          className="img-choose-plan-right"
        />
      </Grid>

      <Link to="" style={{ textAlign: "center" }}>
        <Text.Sub20Bold sx={{ color: "#114AC6", marginTop: "40px !important" }}>
          Learn more about our features
        </Text.Sub20Bold>
      </Link>
    </Box>
  );
};

export default ChoosePlan;
