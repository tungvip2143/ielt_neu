import React from "react";
import Modal from "./index";
import HeaderModalHelp from "../../views/Exam/HeaderModalHelp/HeaderModalHelp";
import Navigate from "../../views/Exam/HeaderModalHelp/ContentNavigate/Navigate";
import { themeCssSx } from "../../ThemeCssSx/ThemeCssSx";
import { Box } from "@mui/material";
// !type
interface Props {
  open?: any;
  onClose?: any;
  width?: any;
  styleModal?: any;
  handleCloseModal?: () => void;
}
const ModalHelpExam = (props: Props) => {
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
        <HeaderModalHelp handleCloseModal={handleCloseModal} />
        <Box sx={content}>
          <Navigate handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </>
  );
};

export default ModalHelpExam;
