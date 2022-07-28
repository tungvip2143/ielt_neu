import * as React from "react";
import { Formik, Form, FormikProps } from "formik";
import { Box, Button, Grid, Card } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
//
import CountDown from "components/Countdown/CountDown";
export interface FormikWizadProps {
  initialValues: object;
  stepNumber: number;
  onStep: Function;
  onSubmit: Function;
  children: React.ReactNode;
  text?: string;
}

interface FormikComProps {
  initialValues: object;
  children: React.ReactNode;
  text?: string;
}

function FormikWizard(props: FormikWizadProps) {
  // !State
  const { initialValues, children, stepNumber, onStep, text, onSubmit, ...rest } = props;

  // !Variable
  const steps = React.Children.toArray(children);
  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  // !Function

  const nextStep = () => {
    onStep(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const preStep = () => {
    onStep(Math.max(0, stepNumber - 1));
  };

  const handleSubmit = async (values: object, bag: any) => {
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      nextStep();
    }
  };
  const card = {
    width: "99%",
    borderRadius: "16px",
    margin: "0 auto",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    padding: "50px 50px",
  };
  const cssButton = {
    padding: "10px 0px",
    width: { xs: "100%", sm: "70%", md: "50%", lg: "30%" },
    maxWidth: "400px",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: 700,
    fontSize: "18px",
    textTransform: "uppercase",
    margin: "0 auto",
    background: "#333",
    "&:hover": {
      background: "#333",
    },
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik: FormikProps<any>) => (
        <Form>
          <Box
            sx={{
              p: "8px 16px",
              background: "#36373b",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "fixed",
              zIndex: 999,
              width: "100%",
            }}
          >
            <Button startIcon={<ArrowBackIosIcon />}>EXIT</Button>
            {stepNumber === 1 && (
              <Box>
                <CountDown />
              </Box>
            )}

            {stepNumber === 1 && (
              <Button type="submit" endIcon={<CheckBoxOutlinedIcon />}>
                SUBMIT
              </Button>
            )}
          </Box>
          <Grid container sx={{ p: 2, marginTop: "56px" }}>
            <Grid item lg={12} md={12}>
              <Card sx={card}>
                {step}
                {stepNumber === 0 && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: "50px" }}>
                    <Button sx={cssButton} onClick={nextStep}>
                      {text}
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

const FormikCom = (props: FormikComProps) => {
  // !Destructure Props
  const { initialValues, children, text, ...rest } = props;

  // !State
  const [stepNumber, setStepNumber] = React.useState(0);

  return (
    <FormikWizard
      initialValues={initialValues}
      stepNumber={stepNumber}
      onStep={setStepNumber}
      onSubmit={async (values: object) => {
        console.log("values", values);
      }}
      text={text}
    >
      {children}
    </FormikWizard>
  );
};

export default FormikCom;
