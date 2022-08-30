// //
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import { useGoogleLogin } from "@react-oauth/google";
// import ImgEmail from "assets/image/login/email.svg";
// import ImgFacebook from "assets/image/login/facebook.svg";
// import ImgGoogle from "assets/image/login/google.svg";
// import { SocialProvider } from "constants/constants";
// import { RouteBase } from "constants/routeUrl";
// import { Form, Formik } from "formik";
// import { useLogin } from "hooks/auth/useAuth";
// import useSagaCreators from "hooks/useSagaCreators";
// import { useGetLocation } from "provider/LocationProvider";
// import React from "react";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import { Redirect, useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
// import { authActions } from "redux/creators/modules/auth";
// import { GetAuthSelector } from "redux/selectors/auth";
// import socialServices from "services/socialServices";
// import CardView from "./components/CardView";
// import Footer from "./components/Footer";
// //
// import ItemSocial from "./components/ItemSocial";
// //
// import Title from "./components/Title";
// //

// const container = {
//   width: "100vw",
//   height: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// //
// const dataGoogle = {
//   title: "Continue with Google",
//   img: ImgGoogle,
//   bg: "#4285f4",
//   color: "#fff",
// };
// const dataFacebook = {
//   title: "Continue with Facebook",
//   img: ImgFacebook,
//   bg: "#fff",
//   color: "#5b5c61",
// };

// const dataEmail = {
//   title: "Continue with Email",
//   img: ImgEmail,
//   bg: "#fff",
//   color: "#5b5c61",
// };
// //
// const content = {
//   desc: "No account?",
//   title: "Sign Up",
// };

// const LoginPage = (props: any) => {
//   const { dispatch } = useSagaCreators();
//   const auth = GetAuthSelector();
//   const { isLogin } = auth;

//   const handleLoginEmail = () => {
//     history.push("/login/email");
//   };

//   const { mutateAsync: login } = useLogin();
//   const history = useHistory();
//   const { initialPathName } = useGetLocation();

//   const loginSocial = async (res: any, provider: any) => {
//     try {
//       const body = {
//         token: res,
//         provider: provider,
//       };
//       const responseSocial = await socialServices.loginSocial(body);

//       if (responseSocial?.data?.data?.data?.access_token) {
//         dispatch(authActions.saveInfoUser, { token: responseSocial?.data?.data?.data?.access_token });
//       }
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message, {
//         autoClose: 3000,
//       });
//     }
//   };

//   const signIn = useGoogleLogin({
//     flow: "implicit",
//     onSuccess: (tokenResponse: any) => {
//       loginSocial(tokenResponse.access_token, SocialProvider.GOOGLE);
//     },
//   });

//   const handleLoginFacebook = async (res: any) => {
//     loginSocial(res.accessToken, SocialProvider.FACEBOOK);
//   };

//   const showFB = () => {
//     return (
//       <FacebookLogin
//         appId="794031728446764"
//         autoLoad={false}
//         fields="name,email,picture"
//         scope="email"
//         callback={handleLoginFacebook}
//         icon="fa-facebook"
//         render={(renderProps) => <ItemSocial data={dataFacebook} onClick={renderProps.onClick} />}
//       />
//     );
//   };

//! Render
//   if (isLogin) {
//     return <Redirect to={initialPathName} />;
//   }

//   return (
//     <Formik
//       validateOnBlur={false}
//       validateOnChange={false}
//       initialValues={{
//         email: "",
//         password: "",
//       }}
//       onSubmit={async (values) => {
//         await login(values, {
//           onSuccess: (response) => {
//             dispatch(authActions.saveInfoUser, { token: response?.data?.data?.data?.access_token });
//           },
//         });
//       }}
//     >
//       {(propsFormik) => (
//         <Form>
//           <Box sx={container}>
//             <CardView>
//               <Title>Login</Title>
//               <Stack direction="column" spacing={2} sx={{ mb: "16px" }}>
//                 <ItemSocial data={dataGoogle} onClick={signIn} />
//                 {showFB()}
//                 <ItemSocial onClick={handleLoginEmail} data={dataEmail} />
//               </Stack>
//               <Footer content={content} pathName={RouteBase.SignUp} />
//             </CardView>
//           </Box>
//         </Form>
//       )}
//     </Formik>
//   );
// };
// export default LoginPage;
import React from "react";
//
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

//
const container = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
import Title from "./components/Title";
import CardView from "./components/CardView";
import FormEmail from "./components/FormEmail";
const LoginPage = () => {
  // ! State

  //! Render

  return (
    <Box sx={container}>
      <CardView>
        <Title>Login to exam</Title>
        <Stack direction="column" spacing={2} sx={{ mb: "16px" }}>
          <FormEmail />
        </Stack>
      </CardView>
    </Box>
  );
};

export default LoginPage;
