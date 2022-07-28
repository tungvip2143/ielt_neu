import * as React from 'react';
import { Formik,Form,FormikProps } from 'formik';
import {Box,Button,Grid,Card} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useHistory } from "react-router-dom";


export interface  FormikWizadProps {
    initialValues : object,
    stepNumber : number,
    onStep: Function,
    onSubmit:Function,
    children:React.ReactNode,
    text ?:string
}

interface FormikComProps {
    initialValues : object,
    children:React.ReactNode,
    text ?:string
}

 function FormikWizard (props:  FormikWizadProps) {
    // !Destructure Props
    const {initialValues,children, stepNumber, onStep, text,onSubmit,...rest} = props

    // !Variable
    const steps = React.Children.toArray(children);
    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;
    const history = useHistory()

    // !Function

  const nextStep = () => {
    onStep(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const preStep = () => {
    onStep(Math.max(0, stepNumber - 1));
  };

  const handleSubmit = async (values:object, bag:any) => {
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      nextStep();
    }
  };

  const handleBackToIeltsPage=()=>history.push("/ielts")

  return (
    <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    >
      {(formik:FormikProps<any>)=>(
        <Form>
            <Box sx={{p:"8px 16px",background:"#36373b",display:"flex",alignItems:"center",justifyContent:"space-between",position:"fixed",zIndex:999,width:"100%"}}>
                <Button onClick={handleBackToIeltsPage} startIcon={<ArrowBackIosIcon/>}>EXIT</Button>
                {stepNumber === 1 && <Button type='submit' endIcon={<CheckBoxOutlinedIcon/>}>SUBMIT</Button> }
            </Box>
            <Grid container sx={{p:2,marginTop:"56px"}}>
                <Grid item lg={12} md={12}>
                    <Card sx={{maxHeight:`calc(100vh - 60px)`}}>
                    {step}
                    {stepNumber === 0 && <Button onClick={nextStep}>{text}</Button> }
                    
                    </Card>
                </Grid>
            </Grid>

        </Form>
      )}
    </Formik>
  );
}


 const FormikCom = (props:FormikComProps)=>{
    // !Destructure Props
    const {initialValues,children,text,...rest} = props

    // !State
  const [stepNumber, setStepNumber] = React.useState(0);

    return(
        <FormikWizard initialValues={initialValues}
        stepNumber={stepNumber}
        onStep={setStepNumber}
        onSubmit={async (values:object) => {
            console.log("values", values);
          }}
          text={text}
        >
            {children}
        </FormikWizard>
    )
}

export default FormikCom