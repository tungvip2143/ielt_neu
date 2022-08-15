import React, { Fragment, Suspense, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
import routes from "routes";
import PrivateRoute from "components/PrivateRoute";
import HeaderResponsive from "../../components/Header/HeaderResponsive";
import NavResponsive from "../../components/Header/NavResponsive";
import { Box } from "@mui/system";
//
const DefaultLayout: React.FC = (props) => {
  const [isShowNav, setIsShowNav] = useState(false);
  const handleShowNavResponsive = () => {
    setIsShowNav(true);
  };
  const handleCloseNavResponsive = (event: any) => {
    setIsShowNav(false);
  };
  return (
    <Box>
      <Header />
      <HeaderResponsive handleShowNavResponsive={handleShowNavResponsive} />
      {isShowNav && <NavResponsive handleCloseNavResponsive={handleCloseNavResponsive} />}
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
