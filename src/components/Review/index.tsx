import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
//
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Grid from "@mui/material/Grid";
//
import EachTable from "./Components/EachTable";
//
const typeExams = [
  {
    id: 1,
    name: "Listening",
    icon: <HeadphonesIcon />,
  },
  {
    id: 2,
    name: "Reading",
    icon: <AutoStoriesIcon />,
  },
  {
    id: 3,
    name: "Writing",
    icon: <CreateIcon />,
  },
  {
    id: 4,
    name: "Speaking",
    icon: <KeyboardVoiceIcon />,
  },
];
const cssBotton = {
  width: "100%",
  color: "#ccc",

  "&:hover": {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
  },
};

export default function BasicTable() {
  const [panal, setPanal] = useState(1);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ background: "#fff", p: "10px 10px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
        <Grid
          container
          sx={{
            display: "flex",
            background: "#F3F4F6",
            p: "5px 5px",
            borderRadius: "15px",
            justifyContent: "space-between",
          }}
        >
          {typeExams.map((item: any) => {
            return (
              <Grid key={item.id} item lg={2.9} sx={{ display: "flex", justifyContent: "center", m: "0 3px" }}>
                <Button
                  style={
                    item.id === panal
                      ? {
                          background: "#fff",
                          color: "red",
                          boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
                          borderRadius: "15px",
                        }
                      : {}
                  }
                  onClick={() => setPanal(item.id)}
                  variant="text"
                  sx={cssBotton}
                  startIcon={item.icon}
                >
                  {item.name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {typeExams.map((type) => {
        if (type.id === panal) {
          return <EachTable panelId={type.id} />;
        }

        return null;
      })}
    </Box>
  );
}
