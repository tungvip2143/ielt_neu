import * as React from "react";
import { Modal as ModalMui, Box, Button as ButtonMui, ButtonProps, Stack, StackProps } from "@mui/material";
import Text from "components/Typography";
import { theme } from "theme/index";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";

export interface Props {
  children?: React.ReactNode;
  sx?: object;
  onClose: () => void;
  open: boolean;
  width?: string;
  styleModal?: any;
}

interface IProps {
  children?: React.ReactNode;
  sx?: object;
  className?: string;
}

interface ButtonMuiProps extends ButtonProps {
  cancel: string;
  confirm: string;
  background?: any;
  color?: any;
  letterSpacing?: any;
  display?: any;
  padding?: any;
  onCancel: () => void;
  onConfirm?: () => void;
}

interface StackMuiProps extends StackProps {
  children: React.ReactNode;
  label?: string;
}

function Modal(props: Props) {
  //! Destructure props
  const { children, onClose, open, width, styleModal } = props;

  // !State
  const styleCss = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    border: "none",
    zIndex: 999,
  };
  return (
    <ModalMui
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack spacing={1} sx={styleCss} style={styleModal}>
        {children}
      </Stack>
    </ModalMui>
  );
}

const Title = (props: IProps) => {
  const { children, ...rest } = props;

  return <Text.Sub20Bold {...rest}>{props.children}</Text.Sub20Bold>;
};

const Content = (props: IProps) => {
  return <div>{props.children}</div>;
};

const Button: React.FC<ButtonMuiProps> = (props) => {
  const { children, cancel, confirm, onCancel, onConfirm, background, color, padding, display, ...rest } = props;
  const btnConfirm = {
    background: background,
    color: color,
    padding: padding,
    letterSpacing: "2px",
    textTransform: "uppercase",
    // display: display,

    "&:hover": {
      background: background,
    },
  };
  const btnCancle = {
    p: "6px 16px",
    color: "#5b5c61",
    border: "1px solid #5b5c61",
    textTransform: "uppercase",
    letterSpacing: "2px",
    display: display,
    "&:hover": {
      background: "none",
      border: "1px solid #5b5c61",
    },
  };
  return (
    <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
      <ButtonMui sx={btnCancle} onClick={onCancel} variant="outlined" {...rest}>
        {cancel}
      </ButtonMui>
      <ButtonMui sx={btnConfirm} onClick={onConfirm} variant="contained" {...rest}>
        {confirm}
      </ButtonMui>
    </Stack>
  );
};

Modal.Title = Title;
Modal.Content = Content;
Modal.Button = Button;

export default Modal;
