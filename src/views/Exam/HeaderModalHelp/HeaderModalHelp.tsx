import React from "react";
import { Box } from "@mui/material";
import Title from "views/components/Title/Title";
import imgPeople from "assets/image/exam/test-help/people-logo.png";
import imgClose from "assets/image/exam/test-help/img-close.png";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
// ! type
interface Props {
  handleCloseModal?: () => void;
}
const HeaderModalHelp = ({ handleCloseModal }: Props) => {
  console.log("fsdf", handleCloseModal);
  const container = {
    background: "#000000",
    borderRadius: "12px 12px 0px 0px",
    ...themeCssSx.flexBox.flexBetweenCenter,
    position: "relative",
  };
  const title = {
    position: "absolute",
    top: "-10px",
  };
  const close = {
    padding: "10px 20px",
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
          <Title image={imgPeople} text="Help" />
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
