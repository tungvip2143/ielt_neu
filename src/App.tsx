import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/scss/styles.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "theme/index";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";
import { RouteBase } from "constants/routeUrl";
import DefaultLayout from "layout/DefaultLayout";
import LoginPage from "views/Login";
import IeltsListening from "views/Ielts/listening";
import IeltsReading from "views/Ielts/reading";
import IeltsWriting from "views/Ielts/writing";
import IeltsSpeaking from "views/Ielts/speaking";
import Pricing from "views/Pricing/Pricing";
import ReviewReading from "views/Review/reading";
import WritngReview from "views/Review/writng";
import Admin from "views/Admin/Admin";
import AdminLayout from "layout/AdminLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCheckAuth } from "hooks/auth/useCheckAuth";
import PrivateRoute from "components/PrivateRoute";
import ListeningReview from "./views/Review/listening/index";
import SpeakingReview from "./views/Review/speaking/index";
import SignUp from "views/SignUp";
import SignUpEmail from "views/SignUp/component/SignUpEmail";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LocationProvider from "provider/LocationProvider";
import ForgotPassword from "views/ForgotPassword";

//

const clientId = "76081722691-0m4n7lmh7n71akn2814n5lthkvl3obdg.apps.googleusercontent.com";

const App: React.FC = () => {
  useCheckAuth();

  //! Render
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LocationProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer position="top-right" autoClose={3000} />
          <Router>
            <Switch>
              <Route path={RouteBase.Login} exact component={LoginPage} />
              <Route path={RouteBase.SignUp} exact component={SignUp} />
              <Route path={RouteBase.SignUpEmail} exact component={SignUpEmail} />
              <Route path={RouteBase.ForgotPassword} exact component={ForgotPassword} />
              <PrivateRoute path={RouteBase.IeltsListening} exact component={IeltsListening} />
              <PrivateRoute path={RouteBase.IeltsReading} exact component={IeltsReading} />
              <PrivateRoute path={RouteBase.IeltsWriting} exact component={IeltsWriting} />
              <PrivateRoute path={RouteBase.IeltsSpeaking} exact component={IeltsSpeaking} />
              <PrivateRoute path={RouteBase.Admin} component={AdminLayout} />
              <Route path={RouteBase.LoginEmail} exact component={LoginEmail} />
              <Route path={RouteBase.Pricing} exact component={Pricing} />
              <Route path={RouteBase.ReviewReading} exact component={ReviewReading} />
              <Route path={RouteBase.WritingReview} exact component={WritngReview} />
              <Route path={RouteBase.ListeningReview} exact component={ListeningReview} />
              <Route path={RouteBase.SpeakingReview} exact component={SpeakingReview} />
              <Route path={RouteBase.AdminLogin} exact component={LoginPage} />
              <Route path={RouteBase.Home} component={DefaultLayout} />
              {/* Admin site */}
            </Switch>
          </Router>
        </ThemeProvider>
      </LocationProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
