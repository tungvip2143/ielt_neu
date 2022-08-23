import React from "react";
//
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import Modal from "components/Modal";
import Typography from "@mui/material/Typography";

//
interface Props {
  open?: any;
  handleCloseModal?: any;
  handleBackIeltsSelection?: any;
  width?: string;
  styleModal?: any;
}
const ModalSpeaking = ({ handleCloseModal, handleBackIeltsSelection, open, width, styleModal }: Props) => {
  return (
    <Modal onClose={handleCloseModal} open={open} width={width} styleModal={styleModal}>
      <Modal.Title
        className="title-modal"
        sx={{ fontSize: "26px", color: "#000000", position: "relative", pr: "16px", width: "fit-content" }}
      >
        Mic test one two
      </Modal.Title>
      <Modal.Content>
        <Typography
          sx={{ m: "10px 0 32px 0", color: themeCssSx.color.desc.modal, fontSize: themeCssSx.fontSize.descSmall }}
          variant="body1"
          color="initial"
        >
          We need to hear your voice. Please "Allow" your browser to enable microphone use. You might have to check your
          browser settings.
        </Typography>
      </Modal.Content>
      <Modal.Button
        onCancel={handleCloseModal}
        onConfirm={handleCloseModal}
        cancel="Back To Test"
        confirm="ok"
        background="rgb(254,198,46)"
        color="#36373b"
        padding="6px 24px"
        display="none"
      />
    </Modal>
  );
};

export default ModalSpeaking;
