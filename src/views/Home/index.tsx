import React from "react";
import useGetTodoList from "hooks/todos/useGetTodoList";
import { useTranslation } from "react-i18next";
import "App.css";
//
import IntroHome from "components/HomePage/IntroHome";
import FavouriteStudents from "components/HomePage/FavouriteStudents";
import InformationData from "components/HomePage/InformationData";
import Steps from "components/HomePage/Steps";
import ChoosePlan from "components/HomePage/ChoosePlan/ChoosePlan";
import StartPractiveFree from "components/HomePage/StartPractiveFree";

//
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//
import ButtonCommon from "components/Button/ButtonCommon";

// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
//
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  // const { data: todoList, loading } = useGetTodoList();

  //! Render
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box sx={{ background: "#fff" }}>
      <div className="container">
        <IntroHome />
      </div>
      <FavouriteStudents />
      <div className="container">
        <InformationData />
      </div>
      <Steps />
      <Typography sx={{ textAlign: "center" }} variant="body1" color="initial">
        *Learn more about our scoring system from our FAQ
      </Typography>
      <div className="container">
        <ChoosePlan />
      </div>
      <StartPractiveFree />
    </Box>
  );
};
export default HomePage;
