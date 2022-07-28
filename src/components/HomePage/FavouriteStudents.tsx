//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// import Typography from "@mui/material/Typography";
import CardFevoriteStudent from "components/Card/CardFevoriteStudent";
import { dataFavouriteStudents } from "components/data/dataFavouriteStudents";
import Text from "components/Typography/index";
const FavouriteStudents = () => {
  const FavouriteStudents = {
    padding: "100px 0",
    background: "rgb(214,227,254)",
  };
  return (
    <Box sx={FavouriteStudents}>
      <Box sx={{ textAlign: "center" }}>
        <Text.Title>Loved by students from 200+ countries</Text.Title>
      </Box>
      <Grid container>
        {dataFavouriteStudents.map((user) => (
          <CardFevoriteStudent user={user} />
        ))}
      </Grid>
    </Box>
  );
};

export default FavouriteStudents;
