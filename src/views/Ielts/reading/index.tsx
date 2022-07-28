import FormikCom from 'components/Formik';
import * as React from 'react';
import {Box} from "@mui/material"

export interface ReadingProps {
}

export default function IeltsReading (props: ReadingProps) {
  return (
    <FormikCom initialValues={{}} text="Start Test">
      <Box>Step1</Box>
      <Box>Step2</Box>
      <Box>Step3</Box>
    </FormikCom>
  );
}
