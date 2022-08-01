import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/scss/styles.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "theme";

import { RouteBase } from "constants/routeUrl";
import DefaultLayout from "layout/DefaultLayout";
import LoginPage from "views/Login";
import IeltsListening from "views/Ielts/listening";
import IeltsReading from "views/Ielts/reading";
import IeltsWriting from "views/Ielts/writing";
import IeltsSpeaking from "views/Ielts/speaking";
import Pricing from "views/Pricing/Pricing";

const App: React.FC = () => {
  //! Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path={RouteBase.Login} exact component={LoginPage} />
          <Route path={RouteBase.IeltsListening} exact component={IeltsListening} />
          <Route path={RouteBase.IeltsReading} exact component={IeltsReading} />
          <Route path={RouteBase.IeltsWriting} exact component={IeltsWriting} />
          <Route path={RouteBase.IeltsSpeaking} exact component={IeltsSpeaking} />
          <Route path={RouteBase.Pricing} exact component={Pricing} />

          <Route path={RouteBase.Home} component={DefaultLayout} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
