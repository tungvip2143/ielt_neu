import React from "react";
//
import LogoIdp from "assets/image/logo/idp.png";
import LogoNeu from "assets/image/logo/neu.png";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      top: 0,
      right: 0,
      left: 0,
      height: "80px",
      padding: "10px 20px",
    },
  };
});
const HeaderExam = () => {
  //! State

  const classes = useStyles();

  //! Render

  return (
    <div className={classes.header}>
      <div>
        <img style={{ width: "300px" }} src={LogoNeu} alt="" />
      </div>
      <div>
        <img style={{ width: "300px" }} src={LogoIdp} alt="" />
      </div>
    </div>
  );
};

export default HeaderExam;