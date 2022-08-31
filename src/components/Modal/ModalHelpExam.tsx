import React from "react";
import Modal from "./index";
import HeaderModalHelp from "../../views/Exam/HeaderModalHelp/HeaderModalHelp";
import Navigate from "../../views/Exam/HeaderModalHelp/ContentNavigate/Navigate";
import { themeCssSx } from "../../ThemeCssSx/ThemeCssSx";
import { Box } from "@mui/material";
import imgPeople from "assets/image/exam/test-help/people-logo.png";

// !type
interface Props {
  open?: any;
  onClose?: any;
  width?: any;
  styleModal?: any;
  handleCloseModal?: () => void;
  typeExam?: any;
}
const ModalHelpExam = (props: Props) => {
  const { open, onClose, width, styleModal, handleCloseModal, typeExam } = props;
  const content = {
    background: themeCssSx.backgroundExam.container,
    padding: "12px",
    mt: "0 !important",
    borderRadius: "0px 0px 12px 12px",
  };
  return (
    <>
      <Modal open={open} onClose={onClose} styleModal={styleModal}>
        <HeaderModalHelp handleCloseModal={handleCloseModal} imageTitle={imgPeople} textTitle="Help" />
        <Box sx={content}>
          <Navigate handleCloseModal={handleCloseModal} typeExam={typeExam} />
        </Box>
      </Modal>
    </>
  );
};

export default ModalHelpExam;
