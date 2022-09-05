import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { makeStyles } from "@mui/styles";

// ! type
interface Props {
  content?: any;
  width?: any;
  styleAdd?: any;
}

const CardExercise = ({ content, width, styleAdd }: Props) => {
  //! State
  const useStyles = makeStyles((theme) => {
    return {
      cardExercises: {
        background: theme.custom?.background.exercises,
        border: `1px solid ${theme.custom?.border.input.bottom}`,
        boxShadow: theme.custom?.boxShadow.exercises,
      },
    };
  });
  const classes = useStyles();
  const card = {
    p: "24px 32px",
    overflowY: { xs: "", lg: "scroll" },
    mb: { xs: "40px", lg: "0" },
    borderRadius: "6px",
    height: styleAdd?.height || "100%",
  };

  //! Render
  return (
    <Grid item xs={12} sm={12} md={12} lg={width}>
      <Box sx={{ ...card }} className={classes.cardExercises}>
        {content}
      </Box>
    </Grid>
  );
};

export default CardExercise;
