import { Box, Button, Stack } from "@mui/material";
import ImgEmail from "assets/image/login/email.svg";
import ImgFacebook from "assets/image/login/facebook.svg";
import ImgGoogle from "assets/image/login/google.svg";
import InputField from "components/CustomField/InputField";
import ErrorFocus from "components/ErrorFocus";
import { RouteBase } from "constants/routeUrl";
import { FastField, Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useAuth";
import useSagaCreators from "hooks/useSagaCreators";
import { useGetLocation } from "provider/LocationProvider";
import { Redirect, useHistory } from "react-router-dom";
import { authActions } from "redux/creators/modules/auth";
import { GetAuthSelector } from "redux/selectors/auth";
import CardView from "views/Login/components/CardView";
import Footer from "views/Login/components/Footer";
import Title from "views/Login/components/Title";
import * as Yup from "yup";

const container = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const input = {
  width: "100%",
  borderRadius: "12px 12px 0px 0px",
  backgroundColor: "rgb(247, 249, 251)",
  padding: "8px 0px 12px 16px",
  border: "1px solid #e3f2fd",
  borderBottom: "1px solid rgb(138, 140, 145)",
  height: "3rem",
};
const forgotPassword = {
  fontSize: "12px",
  float: "right",
  color: "#8a8c91",
  marginBottom: "5px",
};
const btn = {
  width: "100%",
  borderRadius: "16px",
  padding: "16px 0 ",
  mt: "16px",
  background: "#104AC6",
  color: "#fff",
};
const LoginAdminPage = (props: any) => {
  const { dispatch } = useSagaCreators();
  const auth = GetAuthSelector();

  const handleLoginEmail = () => {
    history.push("/login/email");
  };

  const { mutateAsync: login } = useLogin();
  const history = useHistory();
  const { initialPathName } = useGetLocation();

  const signIn = () => {
    console.log("123");
  };
  const validate = Yup.object({
    email: Yup.string().min(5, "*Must be 5 characters").required("Required"),
    password: Yup.string().min(5, "*Must be 10 characters").required("Required"),
  });
  const content = {
    desc: "No account?",
    title: "Sign Up",
  };
  //! Render
  const { isLogin } = auth;

  if (isLogin) {
    return <Redirect to="/admin" />;
  }
  //   history.push(RouteBase.IeltsWithExam(values?.exam?.id));
  //history.push("/login/email");
  return (
    <>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          await login(values, {
            onSuccess: (response) => {
              dispatch(authActions.saveInfoUser, {
                token: response?.data?.data?.data?.access_token,
                userType: "admin",
              });
            },
          });
        }}
      >
        {(propsFormik) => (
          <Form>
            <ErrorFocus />
            <Box sx={container}>
              <CardView>
                <Title>Continue with Email</Title>
                <Stack direction="column" spacing={2} sx={{ mb: "16px" }}>
                  <div style={{ paddingBottom: "30px" }}>
                    <FastField
                      style={input}
                      error=""
                      component={InputField}
                      placeholder="Email"
                      // name="username"
                      {...propsFormik.getFieldProps("email")}
                    />
                  </div>
                  <div style={{ paddingBottom: "30px" }}>
                    <FastField
                      style={input}
                      component={InputField}
                      type="password"
                      placeholder="Password"
                      {...propsFormik.getFieldProps("password")}
                    />
                  </div>

                  <Button style={btn} type="submit">
                    LOGIN
                  </Button>
                  <Footer content={content} pathName={RouteBase.SignUp} />
                </Stack>
              </CardView>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginAdminPage;
