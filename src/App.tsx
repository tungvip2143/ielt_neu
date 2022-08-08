import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/scss/styles.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "theme";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";
import { RouteBase } from "constants/routeUrl";
import DefaultLayout from "layout/DefaultLayout";
import LoginPage from "views/Login";
import IeltsListening from "views/Ielts/listening";
import IeltsReading from "views/Ielts/reading";
import IeltsWriting from "views/Ielts/writing";
import IeltsSpeaking from "views/Ielts/speaking";
import Pricing from "views/Pricing/Pricing";
import ReviewExams from "views/Review/ReviewExams";
import Admin from "views/Admin/Admin";
import AdminLayout from "layout/AdminLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCheckAuth } from "hooks/auth/useCheckAuth";
import PrivateRoute from "components/PrivateRoute";

const App: React.FC = () => {
  useCheckAuth();
  //! Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-right" autoClose={1000} />
      <Router>
        <Switch>
          <Route path={RouteBase.Login} exact component={LoginPage} />
          <PrivateRoute path={RouteBase.IeltsListening} exact component={IeltsListening} />
          <PrivateRoute path={RouteBase.IeltsReading} exact component={IeltsReading} />
          <PrivateRoute path={RouteBase.IeltsWriting} exact component={IeltsWriting} />
          <PrivateRoute path={RouteBase.IeltsSpeaking} exact component={IeltsSpeaking} />
          <Route path={RouteBase.Pricing} exact component={Pricing} />
          <Route path={RouteBase.ReviewExams} exact component={ReviewExams} />

          <PrivateRoute path={RouteBase.Admin} component={AdminLayout} />
          <Route path={RouteBase.Home} component={DefaultLayout} />
          {/* Admin site */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
