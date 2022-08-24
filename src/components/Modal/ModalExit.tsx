import React from "react";
//
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import Modal from "components/Modal";
import Typography from "@mui/material/Typography";

//
interface Props {
  open: any;
  handleCloseModal?: any;
  handleBackIeltsSelection?: any;
  width?: string;
  styleModal?: object;
}
const ModalExit = ({ handleCloseModal, handleBackIeltsSelection, open, width, styleModal }: Props) => {
  return (
    <Modal onClose={handleCloseModal} open={open} width={width} styleModal={styleModal}>
      <Modal.Title
        className="title-modal"
        sx={{ fontSize: "26px", color: "#000000", position: "relative", pr: "16px", width: "fit-content" }}
      >
        Leave the test?
      </Modal.Title>
      <Modal.Content>
        <Typography
          sx={{ m: "10px 0 32px 0", color: themeCssSx.color.desc.modal, fontSize: themeCssSx.fontSize.descSmall }}
          variant="body1"
          color="initial"
        >
          You can't check your score until you finish the test. If you leave now, your answers will be saved but you
          won't be able to see your score yet. Would you like to leave this test now?
        </Typography>
      </Modal.Content>
      <Modal.Button
        onCancel={handleCloseModal}
        onConfirm={handleBackIeltsSelection}
        cancel="Back To Test"
        confirm="Exit"
        background="rgb(254,198,46)"
        color="#36373b"
        padding="6px 24px"
      />
    </Modal>
  );
};

export default ModalExit;
