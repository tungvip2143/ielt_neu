import * as React from "react";
import { Modal as ModalMui, Box, Button as ButtonMui, ButtonProps, Stack, StackProps } from "@mui/material";
import Text from "components/Typography";

export interface Props {
    children?: React.ReactNode;
    sx?: object;
    onClose: () => void;
    open: boolean;
    option?: any

}

interface IProps {
    children?: React.ReactNode;
    sx?: object;
}

interface ButtonMuiProps extends ButtonProps {
    cancel: string;
    confirm: string;
    onCancel: () => void;
    onConfirm: () => void;
}

interface StackMuiProps extends StackProps {
    children: React.ReactNode;
    label?: string;
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
};

function ModalCreateQuestion(props: Props) {
    // !Destructure props
    const { children, onClose, open, option } = props;

    // !State

    return (
        <ModalMui
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack spacing={1} sx={style}>
                {children}
            </Stack>
        </ModalMui>
    );
}

const Title = (props: IProps) => {
    return <Text.CardTitle>{props.children}</Text.CardTitle>;
};

const Content = (props: IProps) => {
    return <Text.SubCardTitle>{props.children}</Text.SubCardTitle>;
};

const Button: React.FC<ButtonMuiProps> = (props) => {
    const { children, cancel, confirm, onCancel, onConfirm, ...rest } = props;
    return (
        <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonMui onClick={onCancel} variant="outlined" {...rest}>
                {cancel}
            </ButtonMui>
            <ButtonMui onClick={onConfirm} variant="contained" {...rest}>
                {confirm}
            </ButtonMui>
        </Stack>
    );
};

ModalCreateQuestion.Title = Title;
ModalCreateQuestion.Content = Content;
ModalCreateQuestion.Button = Button;

export default ModalCreateQuestion;
