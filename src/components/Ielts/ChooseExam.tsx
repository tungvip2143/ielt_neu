import React from "react";
import { Box } from "@mui/system";
import { AutoCompletedMui } from "components/Autocomplete";
import { FastField, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { themeCssSx } from "../../ThemeCssSx/ThemeCssSx";
import { useGetExamination } from "hooks/ielts/useIelts";
const examSemester = [
  { id: 1, label: "Level1" },
  { id: 2, label: "Level2" },
  { id: 3, label: "Level3" },
  { id: 4, label: "Level4" },
  { id: 5, label: "Level5" },
];
const initialValues = {
  exam: {
    name: "",
    id: "",
  },
};
const validationSchema = yup.object().shape({
  exam: yup.object().shape({
    label: yup.string().required("Please choose exam before start"),
  }),
});
const onSubmitExam = (values: any) => {
  console.log("values", values);
};
const container = {
  ...themeCssSx.flexBox.flexJusAlign,
  mt: "80px",
};
const initialFilter = {
  page: 1,
  pageSize: 20,
};

const ChooseExam = () => {
  const { data, isLoading } = useGetExamination(initialFilter);
  const examinations = data?.data?.data?.data || [];

  console.log("aaaaaaaaaa");
  console.log("examinations", examinations);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmitExam(values)}
      >
        {(fomik: any) => {
          return (
            <>
              <Form>
                <Box sx={container}>
                  <Field
                    label="Select Exam"
                    component={AutoCompletedMui}
                    name="exam"
                    options={examinations}
                    loading={isLoading}
                    sx={{ width: "300px", display: { xs: "none", lg: "block" } }}
                  />
                </Box>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default ChooseExam;
