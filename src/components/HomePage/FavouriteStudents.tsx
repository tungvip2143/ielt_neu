import React from "react";
import Title from "components/Typography/Title";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// import Typography from "@mui/material/Typography";
import CardFevoriteStudent from "components/Card/CardFevoriteStudent";
import { dataFavouriteStudents } from "components/data/dataFavouriteStudents";
import Text from "components/Typography/index";
import Slider from "react-slick";

const FavouriteStudents = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  const FavouriteStudents = {
    padding: "100px 0",
    background: "rgb(214,227,254)",
  };
  return (
    <Box sx={FavouriteStudents}>
      <Box sx={{ textAlign: "center" }}>
        <Text.Title>Loved by students from 200+ countries</Text.Title>
      </Box>
      {/* <Grid  container className="container-students">
        {dataFavouriteStudents.map((user) => (
          <CardFevoriteStudent user={user} />
        ))}
      </Grid> */}
      {/* <Slider {...settings} className="container-students-demo">
        {dataFavouriteStudents.map((user) => (
          <CardFevoriteStudent user={user} />
        ))}
      </Slider> */}
    </Box>
  );
};

export default FavouriteStudents;
