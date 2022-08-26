import { makeStyles } from "@mui/styles";
import { AutoCompletedMui } from "components/Autocomplete";
import ButtonCommon from "components/Button/ButtonCommon";
import CommonStyles from "components/CommonStyles";
import { examSemester } from "constants/enum";
import { Formik, FormikHelpers, Form, FastField } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
export interface InitialValueExam {
  exam: {
    id: number;
    label: string;
  };
}

interface DialogSelectExamI {
  open: boolean;
  toggle: () => void;
  onSubmit: (values: InitialValueExam, helpers: FormikHelpers<InitialValueExam>) => void;
}

const useStyles = makeStyles((theme) => {
  return {
    field: {
      width: "100%",
    },
  };
});

const validationSchemaSelectExam = Yup.object().shape({
  exam: Yup.object()
    .shape({
      id: Yup.number().required("Exam is required field!"),
      label: Yup.string().required("Exam is required field!"),
    })
    .required("Exam is required field!"),
});

const DialogSelectExam = ({ open, toggle, onSubmit }: DialogSelectExamI) => {
  //! State
  const classes = useStyles();

  //* md -> display: flex, flex-direction: column, flex-wrap: wrap, gap: 8px
  //* xs -> display: grid, gridTemplateColumns: '8px 8px 8px',

  //! Render
  return (
    <Formik initialValues={{ exam: examSemester[0] }} validationSchema={validationSchemaSelectExam} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Box>
            <CommonStyles.Modal
              open={open}
              toggle={toggle}
              header="Select the exam"
              content={
                <Form>
                  <FastField
                    component={AutoCompletedMui}
                    label="Select Exam"
                    name="exam"
                    className={classes.field}
                    options={examSemester}
                    fullWidth
                  />
                </Form>
              }
              footer={
                <ButtonCommon.ButtonFullBg onClick={() => formik.handleSubmit()}>Submit</ButtonCommon.ButtonFullBg>
              }
            />
          </Box>
        );
      }}
    </Formik>
  );
};

export default DialogSelectExam;
