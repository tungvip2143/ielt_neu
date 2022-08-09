import PrivateRoute from "components/PrivateRoute";
import { RouteBase } from "constants/routeUrl";
import useCheckAuth from "hooks/useCheckAuth";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import AdminScreen from "views/Admin/Admin";
import DefaultAdminLayout from "views/Admin/components/DefaultAdminLayout";
import ListeningSkill from "views/Admin/components/Listening";
import ReadingSkill from "views/Admin/components/Reading";
import SpeakingSkill from "views/Admin/components/Speaking";
import WritingSkill from "views/Admin/components/Writing";
import LoginPage from "views/Login";

const AdminLayout: React.FC = (props) => {
  const history = useHistory();

  //* Handle when user go to /admin
  if (history.location.pathname === RouteBase.Admin) {
    return <Redirect to={RouteBase.Listening} />
  }

  return (
    // <Router>
    <DefaultAdminLayout>
      <main className="main-container" style={{ marginTop: "10px" }}>
        <Suspense fallback="Loading...">
          <Switch>
            <PrivateRoute path={RouteBase.AdminDashboard} exact component={AdminScreen} />
            <PrivateRoute path={RouteBase.Listening} exact component={ListeningSkill} />
            <PrivateRoute path={RouteBase.Speaking} exact component={SpeakingSkill} />
            <PrivateRoute path={RouteBase.Writing} exact component={WritingSkill} />
            <PrivateRoute path={RouteBase.Reading} exact component={ReadingSkill} />
            {/* {routes.map((route: any, idx: any) => {
              if (route.isPrivate) {
                return <PrivateRoute key={idx} path={route.path} exact={route.exact} component={route.component} />;
              }
              return <Route key={idx} path={route.path} exact={route.exact} component={route.component} />;
            })} */}
          </Switch>
        </Suspense>
      </main>
    </DefaultAdminLayout>
    // </Router>
  );
};

export default AdminLayout;
