import React from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
//
import ButtonNumberPage from "components/Button/ButtonNumberPage";
// ! type
interface Data {
  part: string;
  listNumber: any;
}

const CardNumberPage = ({ part, listNumber }: Data) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ width: { md: "65%" } }}>
        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold" }}>{part}</Typography>
          <Box sx={{ display: "flex" }}>
            {listNumber.map((item: any) => {
              return <ButtonNumberPage key={item.id}>{item.number}</ButtonNumberPage>;
            })}
          </Box>
        </Stack>
      </Box>
      <Box sx={{ width: { md: "35%" } }}>
        <Stack direction="row" spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#333" }}>
            <KeyboardArrowLeftIcon sx={{ color: "#fff", fontSize: "24px" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#333" }}>
            <KeyboardArrowRightIcon sx={{ color: "#fff", fontSize: "24px" }} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CardNumberPage;
