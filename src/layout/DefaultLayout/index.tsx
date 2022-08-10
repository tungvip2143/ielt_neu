import React, { Fragment, Suspense } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
import routes from "routes";
import PrivateRoute from "components/PrivateRoute";
import HeaderResponsive from "../../components/Header/HeaderResponsive";
import NavLeft from "components/Header/components/NavLeft";
import Box from "@mui/material/Box";

const DefaultLayout: React.FC = (props) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Header />
      <HeaderResponsive />
      <NavLeft />
      <main className="main-container" style={{ marginTop: "60px" }}>
        <Suspense fallback="Loading...">
          <Switch>
            {routes.map((route: any, idx: any) => {
              if (route.isPrivate) {
                return <PrivateRoute key={idx} path={route.path} exact={route.exact} component={route.component} />;
              }
              return <Route key={idx} path={route.path} exact={route.exact} component={route.component} />;
            })}
          </Switch>
        </Suspense>
      </main>
      {/* <Footer /> */}
    </Box>
  );
};

export default DefaultLayout;
