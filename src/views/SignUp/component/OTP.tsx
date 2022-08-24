import { Box, Button, Modal, Typography } from "@mui/material";
import { Form } from "formik";
import { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import "./styles.scss";
export interface Props {
  keycloakId?: String;
  userId?: String;
  back?: () => void;
  next?: () => void;

  openModal: boolean;

  onCloseModal: () => void;
}

const OTP = (props: Props) => {
  const { openModal, onCloseModal } = props;
  const [OTP, setOTP] = useState("");

  const [checked, setChecked] = useState(true);
  const [time, setTime] = useState<number>(120);
  const interval = useRef<any>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    countDown();
  }, []);

  const countDown = () => {
    interval.current = setInterval(() => {
      setTime((time) => {
        if (time <= 1) {
          clearInterval(interval.current);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  };
  useEffect(() => {
    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, []);

  const checkOTP = () => {
    // activeAccount(props.keycloakId, OTP).then((response) => {
    //   if (response.responseCode === "00" && response.responseData) {
    //     setSuccess(true);
    //   } else {
    //     setChecked(false);
    //   }
    // });
  };

  const reSend = () => {
    // getOTP(props.userId).then((response) => {
    //   if (response.responseCode === "00") {
    //     setTime(120);
    //     countDown();
    //   }
    // });
  };

  return (
    <Modal open={openModal} onClose={onCloseModal}>
      <Box className="modalContainer">
        <Typography className="textCode">Verification code</Typography>
        <Form>
          {!success && (
            <OtpInput
              value={OTP}
              onChange={(otp: any) => setOTP(otp)}
              numInputs={6}
              containerStyle={{ justifyContent: "space-between" }}
              inputStyle={{
                width: 48,
                height: 48,
                border: "1px solid #C7C9D9",
                borderRadius: 8,
              }}
            />
          )}
          <Typography>
            {`Bạn chưa nhận được mã?${time ? ` Vui lòng nhập mã xác thực sau ${time}s` : ""}`}
            <br />
            {time ? "" : <Typography onClick={reSend}>Gửi lại mã xác thực</Typography>}
          </Typography>
          <Button>Submit</Button>
        </Form>
      </Box>
    </Modal>
  );
};
export default OTP;
