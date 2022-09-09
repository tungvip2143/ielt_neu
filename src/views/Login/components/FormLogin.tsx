//
import Button from "@mui/material/Button";
import InputField from "components/CustomField/InputField";
import ErrorFocus from "components/ErrorFocus";
import LoadingPage from "components/Loading";
import { RouteBase } from "constants/routeUrl";
import { FastField, Form, Formik } from "formik";
import { studentLogin } from "hooks/auth/useAuth";
import { useIeltsTestCode } from "hooks/ielts/useIelts";
import useSagaCreators from "hooks/useSagaCreators";
import { useHistory } from "react-router-dom";
import { authActions } from "redux/creators/modules/auth";
import { GetAuthSelector } from "redux/selectors/auth";
import * as Yup from "yup";
//
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { getErrorMsg } from "helpers";
const useStyles = makeStyles((theme) => {
  return {
    input: {
      width: "100%",
      borderRadius: "12px 12px 0px 0px",
      padding: "8px 0px 12px 16px",
      border: `1px solid ${theme.custom?.border.input.main}`,
      borderBottom: `1px solid ${theme.custom?.border.input.bottom}`,
      height: "3rem",
    },
    btnSubmit: {
      width: "100%",
      borderRadius: "16px",
      padding: "16px 0 ",
      marginTop: "16px",
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      border: "none",
      cursor: "pointer",
    },
  };
});
// !type
interface InitialValueExam {
  candidateCode: string;
  studentCode: string;
}
//
const validate = Yup.object({
  candidateCode: Yup.string().min(5, "*Must be 5 characters").required("Required"),
  studentCode: Yup.string().min(5, "*Must be 10 characters").required("Required"),
});

const FormLogin = () => {
  // ! State
  const classes = useStyles();
  const { dispatch } = useSagaCreators();
  const auth = GetAuthSelector();
  console.log("auth", auth);
  const { isLogin } = auth;
  const history = useHistory();
  const { mutateAsync: login, isLoading: isLoadingLogin } = studentLogin();
  const { isLoading: isLoadingTestCode, mutateAsync: createTestCode } = useIeltsTestCode();

  const onSubmitTestCode = async (examinationId: InitialValueExam) => {
    try {
      const response = await createTestCode({ examination: examinationId });
      localStorage.setItem("testCode", response?.data?.data?.testCode);
    } catch (error) {
      toast.error(getErrorMsg(error));
    }
  };

  // ! Render
  if (isLoadingLogin || isLoadingTestCode) {
    return <LoadingPage />;
  }

  return (
    <>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          candidateCode: "",
          studentCode: "",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          await login(values, {
            onSuccess: async (response) => {
              console.log("response", response);
              dispatch(authActions.saveInfoUser, {
                token: response?.data?.data?.data?.access_token,
                user: response?.data?.data?.data?.user,
                userType: "user",
              });
              onSubmitTestCode(response?.data?.data?.data?.examination?.id);
            },
          });
        }}
      >
        {(propsFormik) => (
          <Form>
            <ErrorFocus />
            <div style={{ paddingBottom: "30px" }}>
              <FastField
                lable="Mã sinh viên"
                component={InputField}
                type="text"
                placeholder="Student Code"
                {...propsFormik.getFieldProps("studentCode")}
                className={classes.input}
              />
            </div>
            <div style={{ paddingBottom: "30px" }}>
              <FastField
                lable="Mã thí sinh"
                error=""
                component={InputField}
                type="text"
                placeholder="Candidates Code"
                {...propsFormik.getFieldProps("candidateCode")}
                className={classes.input}
              />
            </div>

            <button className={classes.btnSubmit} type="submit">
              LOGIN
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormLogin;
