import React from "react";
import useGetTodoList from "hooks/todos/useGetTodoList";
import { useTranslation } from "react-i18next";
//
import IntroHome from "components/HomePage/IntroHome";
import FavouriteStudents from "components/HomePage/FavouriteStudents";

//
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
//
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { data: todoList, loading } = useGetTodoList();

  //! Render
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <div className="container">
        <IntroHome />
      </div>
      <FavouriteStudents />
    </Box>
  );
};
export default HomePage;
