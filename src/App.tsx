import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/scss/styles.scss";
import { ThemeProvider } from "@mui/material/styles";
import {CssBaseline} from "@mui/material"
import { theme } from "theme";

import { RouteBase } from "constants/routeUrl";
import DefaultLayout from "layout/DefaultLayout";
import LoginPage from "views/Login";

const App: React.FC = () => {
  //! Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
      <Switch>
        <Route path={RouteBase.Login} exact component={LoginPage} />
        <Route path={RouteBase.Home} component={DefaultLayout} />
      </Switch>
    </Router>
    </ThemeProvider>
  );
};

export default App;
