import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import ReactHtmlParser from "react-html-parser";

interface Props {
  open?: any;
  handleClose?: any;
  children?: any;
  content?: any;
  handleCloseAnswer?: any;
}

const modal = {
  width: "42%",
  position: "fixed",
  height: "100%",
  top: "65px",
  right: 0,
  bottom: 0,
  zIndex: 9999,
  background: "#f7f9fb",
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  padding: "32px",
};
const container = {
  width: "100%",
  height: "100%",
};
const iconClose = {
  fontSize: "36px",
  float: "right",
};
const contentRender = {
  mt: "100px",
};
const ModalRightAnswer = ({ handleClose, open, children, content, handleCloseAnswer }: Props) => {
  return (
    <Box sx={modal} onClick={() => handleClose()}>
      <CloseIcon onClick={() => handleCloseAnswer()} sx={iconClose} />
      <Box sx={contentRender}>{ReactHtmlParser(content)}</Box>
    </Box>
  );
};

export default ModalRightAnswer;
