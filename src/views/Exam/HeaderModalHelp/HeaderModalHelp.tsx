import React from "react";
import { Box } from "@mui/material";
import Title from "views/components/Title/Title";
import imgClose from "assets/image/exam/test-help/img-close.png";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
// ! type
interface Props {
  handleCloseModal?: () => void;
  textTitle?: any;
  imageTitle?: any;
}
const HeaderModalHelp = ({ handleCloseModal, textTitle, imageTitle }: Props) => {
  console.log("fsdf", handleCloseModal);
  const container = {
    background: "#000000",
    borderRadius: "12px 12px 0px 0px",
    ...themeCssSx.flexBox.flexBetweenCenter,
    position: "relative",
  };
  const title = {
    position: "absolute",
    top: "-7px",
  };
  const close = {
    padding: "8px 20px",
    cursor: "pointer",
    ...themeCssSx.flexBox.flexAlignCenter,
  };
  const imgEventClose = {
    width: "20px",
  };

  return (
    <>
      <Box sx={container}>
        <Box sx={title}>
          <Title image={imageTitle} text={textTitle} />
        </Box>
        <Box></Box>
        <Box onClick={handleCloseModal} style={close}>
          <img style={imgEventClose} src={imgClose} alt="" />
        </Box>
      </Box>
    </>
  );
};

export default HeaderModalHelp;
