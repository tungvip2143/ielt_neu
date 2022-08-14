import PrivateRoute from "components/PrivateRoute";
import { RouteBase } from "constants/routeUrl";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import AdminScreen from "views/Admin/Admin";
import DefaultAdminLayout from "views/Admin/components/DefaultAdminLayout";
import ListeningSkill from "views/Admin/components/Listening/ListeningSkill";
import ReadingSkill from "views/Admin/components/Reading";
import SpeakingSkill from "views/Admin/components/Speaking/SpeakingSkill";
import WritingSkill from "views/Admin/components/Writing";
import CreateQuestionListening from "views/Admin/components/Listening/CreateQuestionListening/CreateQuestionListening";
import CreateQuestionSpeaking from "views/Admin/components/Speaking/CreateQuestionSpeaking/CreateQuestionSpeaking";

const AdminLayout: React.FC = (props) => {
  const history = useHistory();

  //* Handle when user go to /admin
  if (history.location.pathname === RouteBase.Admin) {
    return <Redirect to={RouteBase.Listening} />;
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
            <PrivateRoute
              path={RouteBase.CreateListening}
              exact
              component={() => <CreateQuestionListening openCreateScreen={{ type: "create" }} />}
            />
            <PrivateRoute
              path={RouteBase.UpdateListening}
              exact
              component={() => <CreateQuestionListening openCreateScreen={{ type: "update" }} />}
            />
            <Route
              path={RouteBase.CreateSpeaking}
              exact
              component={() => <CreateQuestionSpeaking openCreateScreen={{ type: "create" }} />}
            />
            <Route
              path={RouteBase.UpdateSpeaking}
              exact
              component={() => <CreateQuestionSpeaking openCreateScreen={{ type: "update" }} />}
            />
          </Switch>
        </Suspense>
      </main>
    </DefaultAdminLayout>
    // </Router>
  );
};

export default AdminLayout;
