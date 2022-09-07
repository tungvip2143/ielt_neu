// import * as React from "react";
// import Box from "@mui/material/Box";
// import Skeleton from "@mui/material/Skeleton";

// export default function LoadingCircular() {
//   return (
//     <Box sx={{ width: "100%" }}>
//       <Skeleton width={140} sx={{ minHeight: "53.6px", maxHeight: "53.6px", marginLeft: "auto" }} />
//       <Skeleton variant="rounded" height={500} />
//       {/* <Skeleton sx={{ minHeight: "53.6px", maxHeight: "53.6px" }} />
//       <Skeleton sx={{ minHeight: "53.6px", maxHeight: "53.6px" }} />
//       <Skeleton sx={{ minHeight: "53.6px", maxHeight: "53.6px" }} />
//       <Skeleton sx={{ minHeight: "53.6px", maxHeight: "53.6px" }} />
//       <Skeleton sx={{ minHeight: "53.6px", maxHeight: "53.6px" }} />
//       <Skeleton sx={{ minHeight: "53.6px", maxHeight: "53.6px" }} />
//       <Skeleton sx={{ minHeight: "53.6px", maxHeight: "53.6px" }} />
//       <Skeleton sx={{ minHeight: "53.6px", maxHeight: "53.6px" }} />
//       <Skeleton sx={{ minHeight: "53.6px", maxHeight: "53.6px" }} /> */}
//     </Box>
//   );
// }
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    cirularIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "500px",
    },
  };
});
export default function LoadingCircular() {
  const classes = useStyles();
  return (
    <Box className={classes.cirularIcon}>
      <CircularProgress size={40} color="primary" />
    </Box>
  );
}
