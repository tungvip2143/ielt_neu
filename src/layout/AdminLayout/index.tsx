import { RouteBase } from "constants/routeUrl";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminScreen from "views/Admin/Admin";
import DefaultAdminLayout from "views/Admin/components/DefaultAdminLayout";
import ListeningSkill from "views/Admin/components/Listening";
import ReadingSkill from "views/Admin/components/Reading";
import SpeakingSkill from "views/Admin/components/Speaking";
import WritingSkill from "views/Admin/components/Writing";
import LoginPage from "views/Login";

const AdminLayout: React.FC = (props) => {
  return (
    // <Router>
    <DefaultAdminLayout>
      <main className="main-container" style={{ marginTop: "10px" }}>
        <Suspense fallback="Loading...">
          <Switch>
            <Route path={"/admin/login"} exact component={LoginPage} />
            <Route path={RouteBase.AdminDashboard} exact component={AdminScreen} />
            <Route path={RouteBase.Listening} exact component={ListeningSkill} />
            <Route path={RouteBase.Speaking} exact component={SpeakingSkill} />
            <Route path={RouteBase.Writing} exact component={WritingSkill} />
            <Route path={RouteBase.Reading} exact component={ReadingSkill} />

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
