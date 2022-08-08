import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function AdminBreadcrumbs() {
  const location = useLocation();
  console.log('location', location);
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
    </div>
  );
}
