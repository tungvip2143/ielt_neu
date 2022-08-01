import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
//
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
//
import EachTable from "./Components/EachTable";
import { TypeExamEnum } from "constants/enum";

//

const cssBotton = {
  width: "100%",
  color: "#8A8C91",

  "&:hover": {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
  },
};

export default function BasicTable() {
  const [panal, setPanal] = useState<TypeExamEnum>(TypeExamEnum.LISTENING);
  //
  const typeExams = [
    {
      id: TypeExamEnum.LISTENING,
      name: "Listening",
      icon: <HeadphonesIcon />,
    },
    {
      id: TypeExamEnum.READING,
      name: "Reading",
      icon: <AutoStoriesIcon sx={panal === "READING" ? { color: "#B0D909" } : {}} />,
    },
    {
      id: TypeExamEnum.WRITTING,
      name: "Writing",
      icon: <CreateIcon sx={panal === "WRITTING" ? { color: "#8CE5EC" } : {}} />,
    },
    {
      id: TypeExamEnum.SPEAKING,
      name: "Speaking",
      icon: <KeyboardVoiceIcon sx={panal === "SPEAKING" ? { color: "#FF9700" } : {}} />,
    },
  ];
  //
  const colorButon = () => {
    if (panal === TypeExamEnum.LISTENING) {
      return "red";
    }
    if (panal === TypeExamEnum.READING) {
      return "#B0D909";
    }
    if (panal === TypeExamEnum.WRITTING) {
      return "#8CE5EC";
    }
    if (panal === TypeExamEnum.SPEAKING) {
      return "#FF9700";
    }
  };
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Box sx={{ background: "#fff", p: "10px 10px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
        <Box
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
              <Box key={item.id} sx={{ display: "flex", justifyContent: "center", m: "0 3px", width: { xs: "24%" } }}>
                <Button
                  style={
                    item.id === panal
                      ? {
                          background: "#fff",
                          color: colorButon(),
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
              </Box>
            );
          })}
        </Box>
      </Box>
      {typeExams.map((type) => {
        if (type.id === panal) {
          return <EachTable panelId={type.id} />;
        }

        return null;
      })}
      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          position: {
            xs: "absolute",
            lg: "unset",
          },
          top: "0",
          right: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "#fff",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0.7",
        }}
      >
        <NoEncryptionGmailerrorredIcon sx={{ fontSize: "200px" }} />
      </Box>
    </Box>
  );
}
