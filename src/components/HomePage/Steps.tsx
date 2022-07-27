import React, { useRef } from "react";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";

//
import CardStep from "components/Card/CardStep";
import ImgStep1 from "assets/image/home/step1.png";
import ImgStep2 from "assets/image/home/step2.png";
import ImgStep3 from "assets/image/home/step3.png";
//
import Title from "components/Typography/Title";
import DescNormal from "components/Typography/DescNormal";
import TextSteps from "components/Typography/TextSteps";
import Typography from "@mui/material/Typography";
import Sub20Bold from "components/Typography/Sub20Bold";

const Steps = () => {
  const StepsForGoodLeft = () => {
    const card = {
      padding: { xs: "50px 20px", sm: "50px 50px" },
      boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
    };
    const rounded = {
      border: "2px solid #ccc",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      width: "30px",
      height: "30px",
      color: "#8A8C91",
    };
    const itemRight = {
      width: { xs: "100%", md: "70%" },
      p: "20px 30px",
      background: "#F7F9FB",
      borderRadius: "10px",
      color: "#8A8C91",
      "&:hover": {
        backgroundColor: "#bbdefb",
        // color: "#2196f3 ",
      },
    };
    return (
      <Box sx={{ pr: { xs: "0", lg: "100px" }, transform: { md: "translateX(-120px)", lg: "translateX(0)" } }}>
        <Card sx={card}>
          <Stack direction="row" spacing={5} sx={{ alignItems: "center", mb: "50px" }}>
            <Box sx={rounded}>1</Box>
            <Stack direction="row" spacing={2} sx={itemRight}>
              <FlutterDashIcon sx={{ fontSize: "30px" }} />
              <Sub20Bold>Take a Practice Test</Sub20Bold>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={5} sx={{ alignItems: "center", mb: "50px" }}>
            <Box sx={rounded}>2</Box>
            <Stack direction="row" spacing={2} sx={itemRight}>
              <LibraryBooksIcon sx={{ fontSize: "30px", color: "#8A8C91" }} />
              <Sub20Bold>Get Scores Instantly</Sub20Bold>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={5} sx={{ alignItems: "center" }}>
            <Box sx={rounded}>3</Box>
            <Stack direction="row" spacing={2} sx={itemRight}>
              <WbTwilightIcon sx={{ fontSize: "30px", color: "#8A8C91" }} />
              <Sub20Bold>Review & Improve</Sub20Bold>
            </Stack>
          </Stack>
        </Card>
      </Box>
    );
  };
  const StepsForGoodRight = () => {
    const steps = {
      title: "Increase your TOEFL® score using our 3 easy steps!",
      desc: "We analyze your performance and give you advice on how to improve your scores. Our students have reported a score boost after just 1 week of practice.*",
    };
    return (
      <Box sx={{ mt: { xs: "50px", lg: "0" }, transform: { xs: "0", md: "translateX(200px)", lg: "translateX(0)" } }}>
        <Box sx={{ maxWidth: "400px" }}>
          <Title>{steps.title}</Title>
        </Box>
        <Box sx={{ maxWidth: "400px" }}>
          <DescNormal>{steps.desc}</DescNormal>
        </Box>
        <Button variant="text" endIcon={<KeyboardArrowDownIcon />}>
          SEE HOW
        </Button>
      </Box>
    );
  };
  //
  const step1 = {
    step: "STEP 1",
    title: "Choose how  YOU want to practice.",
    desc: "Select your practice based on your schedule and learning style to improve your score at your own pace.",
    desc2:
      "Timed with spoken instructions, our tests are modeled after real TOEFL exam materials and created by TOEFL experts.",
    image: ImgStep1,
  };
  const step2 = {
    step: "STEP 1",
    title: "Choose how  YOU want to practice.",
    desc: "Select your practice based on your schedule and learning style to improve your score at your own pace.",
    desc2:
      "Timed with spoken instructions, our tests are modeled after real TOEFL exam materials and created by TOEFL experts.",
    image: ImgStep2,
  };
  const step3 = {
    step: "STEP 1",
    title: "Choose how  YOU want to practice.",
    desc: "Select your practice based on your schedule and learning style to improve your score at your own pace.",
    desc2:
      "Timed with spoken instructions, our tests are modeled after real TOEFL exam materials and created by TOEFL experts.",
    image: ImgStep3,
  };
  const Left = () => {
    return (
      <Box>
        <TextSteps>{step1.step}</TextSteps>
        <Box sx={{ maxWidth: "400px" }}>
          <Title>{step1.title}</Title>
          <DescNormal>{step1.desc}</DescNormal>
          <DescNormal>{step1.desc2}</DescNormal>
        </Box>
      </Box>
    );
  };
  const Right = () => {
    return (
      <Box>
        <img style={{ width: "100%", borderRadius: "20px" }} src={step1.image} alt="" />
      </Box>
    );
  };
  //
  const Left2 = () => {
    return (
      <Box>
        <TextSteps>{step2.step}</TextSteps>
        <Box sx={{ maxWidth: "400px" }}>
          <Title>{step2.title}</Title>
          <DescNormal>{step2.desc}</DescNormal>
          <DescNormal>{step2.desc2}</DescNormal>
        </Box>
      </Box>
    );
  };
  const Right2 = () => {
    return (
      <Box>
        <img style={{ width: "100%", borderRadius: "20px" }} src={step2.image} alt="" />
      </Box>
    );
  };
  //
  const Left3 = () => {
    return (
      <Box>
        <TextSteps>{step3.step}</TextSteps>
        <Box sx={{ maxWidth: "400px" }}>
          <Title>{step3.title}</Title>
          <DescNormal>{step3.desc}</DescNormal>
          <DescNormal>{step3.desc2}</DescNormal>
        </Box>
      </Box>
    );
  };
  const Right3 = () => {
    return (
      <Box>
        <img style={{ width: "100%", borderRadius: "20px" }} src={step3.image} alt="" />
      </Box>
    );
  };
  //
  const bg = {
    background: "#F7F9FB",
  };
  return (
    <Box>
      <CardStep reverse left={<StepsForGoodRight />} right={<StepsForGoodLeft />} bg={bg} />
      <CardStep left={<Left />} right={<Right />} />
      <CardStep left={<Left2 />} right={<Right2 />} bg={bg} />
      <CardStep left={<Left3 />} right={<Right3 />} />
    </Box>
  );
};

export default Steps;
