import PrivateRoute from "components/PrivateRoute";
import { RouteBase } from "constants/routeUrl";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import AdminScreen from "views/Admin/Admin";
import DefaultAdminLayout from "views/Admin/components/DefaultAdminLayout";
import CreateReading from "views/Admin/components/Reading/CreateReading/CreateReading";
import CreateWriting from "views/Admin/components/Writing/CreateWriting/CreateWriting";
import CreateListening from "views/Admin/components/Listening/CreateListening/CreateListening";
import CreateSpeaking from "views/Admin/components/Speaking/CreateSpeaking/CreateSpeaking";
import ListeningSkill from "views/Admin/components/Listening/ListeningSkill";
import ReadingSkill from "views/Admin/components/Reading/ReadingSkill";
import SpeakingSkill from "views/Admin/components/Speaking/SpeakingSkill";
import ExamManagement from "views/Admin/ExamManagement";
import ContestManagement from "views/Admin/ContestManagemet";
import CreateContest from "views/Admin/ContestManagemet/CreateContest";
import WritingSkill from "views/Admin/components/Writing/WritingSkill";
import StaticManagement from "views/Admin/StaticManagement";
import UserAdmin from "views/Admin/components/UserAdmin/UserAdmin";
import CreateUser from "views/Admin/components/UserAdmin/CreateUser/CreateUser";
import ViewExam from "views/Admin/ExamManagement/component/ViewExam";

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
            <PrivateRoute path={RouteBase.AdminUser} exact component={UserAdmin} />
            <PrivateRoute
              path={RouteBase.CreateUser}
              exact
              component={() => <CreateUser openCreateScreen={{ type: "create" }} />}
            />
            <PrivateRoute
              path={RouteBase.UpdateUser}
              exact
              component={() => <CreateUser openCreateScreen={{ type: "update" }} />}
            />
            <PrivateRoute
              path={RouteBase.CreateListening}
              exact
              component={() => <CreateListening openCreateScreen={{ type: "create" }} />}
            />
            <PrivateRoute
              path={RouteBase.UpdateListening}
              exact
              component={() => <CreateListening openCreateScreen={{ type: "update" }} />}
            />
            <PrivateRoute
              path={RouteBase.CreateSpeaking}
              exact
              component={() => <CreateSpeaking openCreateScreen={{ type: "create" }} />}
            />
            <PrivateRoute
              path={RouteBase.UpdateSpeaking}
              exact
              component={() => <CreateSpeaking openCreateScreen={{ type: "update" }} />}
            />
            <PrivateRoute
              path={RouteBase.CreateReading}
              exact
              component={() => <CreateReading openCreateScreen={{ type: "create" }} />}
            />
            <PrivateRoute
              path={RouteBase.UpdateReading}
              exact
              component={() => <CreateReading openCreateScreen={{ type: "update" }} />}
            />
            <PrivateRoute
              path={RouteBase.CreateWriting}
              exact
              component={() => <CreateWriting openCreateScreen={{ type: "create" }} />}
            />
            <PrivateRoute
              path={RouteBase.UpdateWriting}
              exact
              component={() => <CreateWriting openCreateScreen={{ type: "update" }} />}
            />
            <PrivateRoute path={RouteBase.ExamManagement} exact component={ExamManagement} />
            <PrivateRoute path={RouteBase.ViewExam} exact component={ViewExam} />
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
