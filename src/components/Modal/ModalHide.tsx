import React from "react";
import Modal from "./index";
import HeaderModalHelp from "../../views/Exam/HeaderModalHelp/HeaderModalHelp";
import { themeCssSx } from "../../ThemeCssSx/ThemeCssSx";
import { Box } from "@mui/material";
import tivi from "assets/image/exam/tivi.png";
import Desc16My15 from "../FontText/Desc16My15";
import ButtonModalSubmit from "../Button/ButtonModalSubmit";
// !type
interface Props {
  open?: any;
  onClose?: any;
  width?: any;
  styleModal?: any;
  handleCloseModal?: () => void;
}
const ModalHide = (props: Props) => {
  const { open, onClose, width, styleModal, handleCloseModal } = props;
  const content = {
    background: themeCssSx.backgroundExam.container,
    padding: "12px",
    mt: "0 !important",
    borderRadius: "0px 0px 12px 12px",
  };
  return (
    <>
      <Modal open={open} onClose={onClose} styleModal={styleModal}>
        <HeaderModalHelp handleCloseModal={handleCloseModal} imageTitle={tivi} textTitle="Screen hidden" />
        <Box sx={content}>
          <Desc16My15>Your answers have been stored.</Desc16My15>
          <Desc16My15>Please note that the clock is still running. The time has not been paused.</Desc16My15>
          <Desc16My15>If you wish to leave the room, please tell your invigilator.</Desc16My15>
          <Desc16My15>Click the button below to go back to your test.</Desc16My15>
          <Box sx={{ ...themeCssSx.flexBox.flexJusCenter, mb: "16px" }}>
            <ButtonModalSubmit handleCloseModal={handleCloseModal}>Resume test</ButtonModalSubmit>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalHide;
