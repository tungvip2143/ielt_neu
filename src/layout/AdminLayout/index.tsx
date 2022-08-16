import PrivateRoute from "components/PrivateRoute";
import { RouteBase } from "constants/routeUrl";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import AdminScreen from "views/Admin/Admin";
import DefaultAdminLayout from "views/Admin/components/DefaultAdminLayout";
import CreateQuestionReading from "views/Admin/components/Reading/CreateReading/CreateReading";
import CreateQuestionWriting from "views/Admin/components/Writing/CreateWriting/CreateWriting";
import CreateQuestionListening from "views/Admin/components/Listening/CreateListening/CreateListening";
import CreateQuestionSpeaking from "views/Admin/components/Speaking/CreateSpeaking/CreateSpeaking";
import ListeningSkill from "views/Admin/components/Listening/ListeningSkill";
import ReadingSkill from "views/Admin/components/Reading/ReadingSkill";
import SpeakingSkill from "views/Admin/components/Speaking/SpeakingSkill";
// import WritingSkill from "views/Admin/components/Writing";
// import CreateQuestionListening from "views/Admin/components/Listening/CreateQuestionListening/CreateQuestionListening";
// import CreateQuestionSpeaking from "views/Admin/components/Speaking/CreateQuestionSpeaking/CreateQuestionSpeaking";
import ExamManagement from "views/Admin/ExamManagement";
import ContestManagement from "views/Admin/ContestManagemet";
import CreateContest from "views/Admin/ContestManagemet/CreateContest";
import WritingSkill from "views/Admin/components/Writing/WritingSkill";
import StaticManagement from "views/Admin/StaticManagement";

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
            <PrivateRoute
              path={RouteBase.CreateSpeaking}
              exact
              component={() => <CreateQuestionSpeaking openCreateScreen={{ type: "create" }} />}
            />
            <PrivateRoute
              path={RouteBase.UpdateSpeaking}
              exact
              component={() => <CreateQuestionSpeaking openCreateScreen={{ type: "update" }} />}
            />
            <PrivateRoute
              path={RouteBase.CreateReading}
              exact
              component={() => <CreateQuestionReading openCreateScreen={{ type: "create" }} />}
            />
            <PrivateRoute
              path={RouteBase.UpdateReading}
              exact
              component={() => <CreateQuestionReading openCreateScreen={{ type: "update" }} />}
            />
            <PrivateRoute
              path={RouteBase.CreateWriting}
              exact
              component={() => <CreateQuestionWriting openCreateScreen={{ type: "create" }} />}
            />
            <PrivateRoute
              path={RouteBase.UpdateWriting}
              exact
              component={() => <CreateQuestionWriting openCreateScreen={{ type: "update" }} />}
            />
            <PrivateRoute path={RouteBase.ExamManagement} exact component={ExamManagement} />
            <PrivateRoute path={RouteBase.ContestManagement} exact component={ContestManagement} />
            <PrivateRoute path={RouteBase.CreateContestManagement} exact component={() => <CreateContest />} />
            <PrivateRoute path={RouteBase.StaticManagement} exact component={() => <StaticManagement />} />
          </Switch>
        </Suspense>
      </main>
    </DefaultAdminLayout>
    // </Router>
  );
};

export default AdminLayout;
