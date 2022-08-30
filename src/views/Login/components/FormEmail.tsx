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

const input = {
  width: "100%",
  borderRadius: "12px 12px 0px 0px",
  // backgroundColor: "rgb(247, 249, 251)",
  padding: "8px 0px 12px 16px",
  border: "1px solid #e3f2fd",
  borderBottom: "1px solid rgb(138, 140, 145)",
  height: "3rem",
};

const btn = {
  width: "100%",
  borderRadius: "16px",
  padding: "16px 0 ",
  mt: "16px",
  background: "#104AC6",
  color: "#fff",
};

const FormEmail = () => {
  // ! State
  const { dispatch } = useSagaCreators();
  const auth = GetAuthSelector();
  const { isLogin } = auth;
  const history = useHistory();
  const { mutateAsync: login, isLoading: isLoadingLogin } = studentLogin();
  const { isLoading: isLoadingTestCode, mutateAsync: createTestCode } = useIeltsTestCode();

  const onSubmitTestCode = async (examinationId: InitialValueExam) => {
    await createTestCode(
      { examination: examinationId },
      {
        onSuccess: (response: any) => {
          localStorage.setItem("testCode", response?.data?.data?.testCode);
          history.push(RouteBase.IeltsListening);
        },
        onError: (err: any) => {
          if (err.response.data.statusCode === 401) {
          }
        },
      }
    );
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
            onSuccess: (response) => {
              localStorage.setItem("examinationId", response?.data?.data?.data?.examination?.id);
              dispatch(authActions.saveInfoUser, {
                token: response?.data?.data?.data?.access_token,
                user: response?.data?.data?.data,
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
                style={input}
                component={InputField}
                type="text"
                placeholder="Student Code"
                {...propsFormik.getFieldProps("studentCode")}
              />
            </div>
            <div style={{ paddingBottom: "30px" }}>
              <FastField
                lable="Mã thí sinh"
                style={input}
                error=""
                component={InputField}
                type="text"
                placeholder="Candidates Code"
                // name="username"
                {...propsFormik.getFieldProps("candidateCode")}
              />
            </div>

            <Button style={btn} type="submit">
              LOGIN
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormEmail;
