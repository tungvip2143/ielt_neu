import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import ButtonCommon from "components/Button";
import useSagaCreators from "hooks/useSagaCreators";
import { authActions } from "redux/creators/modules/auth";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function AdminBreadcrumbs() {
  const location = useLocation();
  const { dispatch } = useSagaCreators();
  console.log("location", location);

  const onLogout = () => {
    dispatch(authActions.logout);
  };
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
          Core
        </Link> */}
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>

      <ButtonCommon onClick={onLogout}>Logout</ButtonCommon>
    </div>
  );
}
