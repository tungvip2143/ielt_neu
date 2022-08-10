import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
//
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import HelpIcon from "@mui/icons-material/Help";
//
import EachTable from "./Components/EachTable";
import { TypeExamEnum } from "constants/enum";
import Card from "@mui/material/Card";

//
import TitleIntroExam from "components/TitleIntroExam/TitleIntroExam";
import Text from "components/Typography/index";
import { useIeltsResult } from "hooks/ielts/useIelts";
import { themeCssSx } from "../../ThemeCssSx/ThemeCssSx";
//
const lock = {
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
};
// ! type
interface PropsBg {
  bg: {
    background2: string;
  };
}

const cssBotton = {
  width: "100%",
  color: "#8A8C91",

  "&:hover": {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
  },
};

export default function BasicTable({ bg }: PropsBg) {
  console.log(bg);
  const [panal, setPanal] = useState<TypeExamEnum>(TypeExamEnum.LISTENING);
  const { data } = useIeltsResult({ skill: "READING" });
  console.log("review data", data);
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
      icon: <AutoStoriesIcon sx={panal === "READING" ? { color: themeCssSx.colorIcons.reading } : {}} />,
    },
    {
      id: TypeExamEnum.WRITING,
      name: "Writing",
      icon: <CreateIcon sx={panal === "WRITING" ? { color: themeCssSx.colorIcons.writing } : {}} />,
    },
    {
      id: TypeExamEnum.SPEAKING,
      name: "Speaking",
      icon: <KeyboardVoiceIcon sx={panal === "SPEAKING" ? { color: themeCssSx.colorIcons.speaking } : {}} />,
    },
  ];
  //
  const colorButon = () => {
    if (panal === TypeExamEnum.LISTENING) {
      return themeCssSx.colorIcons.listening;
    }
    if (panal === TypeExamEnum.READING) {
      return themeCssSx.colorIcons.reading;
    }
    if (panal === TypeExamEnum.WRITING) {
      return themeCssSx.colorIcons.writing;
    }
    if (panal === TypeExamEnum.SPEAKING) {
      return themeCssSx.colorIcons.speaking;
    }
  };
  //
  const dataTitleIntroExam = {
    title: "Scores & Review",
    desc: "Check out your results, and see how you can improve your score.",
    background: "rgb(255,245,247)",
  };
  const conteiner = {
    p: "50px 10px 100px 10px",
    background: dataTitleIntroExam.background,
    position: "relative",
    display: "flex",
    justifyContent: "center",
  };
  const containerTitle = {
    display: { xs: "block", sm: "flex" },
    justifyContent: "space-between",
    alignItems: "center",
  };
  const card = {
    p: "20px 20px",
    borderRadius: "12px",
    maxWidth: "124px",
    m: { xs: "0 auto", sm: "0" },
    mt: { xs: "30px", sm: "0" },
  };
  const cardHelp = {
    p: "24px 22px",
    borderRadius: "12px",
    "&:hover": {
      backgroundColor: "#f7f9fb",
    },
  };
  const iconHelp = {
    fontSize: "40px",
    mb: "5px",
    color: "#9ca3af",
  };
  const headerReviesConteiner = {
    width: "100%",
    position: "relative",
    transform: "translateY(-40px)",
  };
  const headerContent = {
    background: "#fff",
    p: "10px 10px",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  };

  const headerContent2 = {
    display: "flex",
    background: "#F3F4F6",
    p: "5px 5px",
    borderRadius: "15px",
    justifyContent: "space-between",
  };
  const headerItem = {
    display: "flex",
    justifyContent: "center",
    m: "0 3px",
    width: { xs: "24%" },
  };
  const highLightButon = {
    background: "#fff",
    color: colorButon(),
    boxShadow: "rgba(0, 0, 0, 0.20) 0px 5px 15px",
    borderRadius: "15px",
  };
  return (
    <Box>
      <Box sx={conteiner}>
        <div className="container">
          <Box sx={containerTitle}>
            <Box sx={{ width: "252px" }}>
              <TitleIntroExam dataTitleIntroExam={dataTitleIntroExam} />
            </Box>
            <Card sx={card}>
              <Box className="card-help" sx={cardHelp}>
                <HelpIcon className="icon-help" sx={iconHelp} />
                <Text.Desc16 sx={{ textAlign: "center", color: "#9ca3af" }}>help</Text.Desc16>
              </Box>
            </Card>
          </Box>
        </div>
      </Box>
      <Box sx={{ background: bg.background2, pb: "100px" }}>
        <div className="container">
          <Box sx={headerReviesConteiner}>
            <Box sx={headerContent}>
              <Box sx={headerContent2}>
                {typeExams.map((item: any) => {
                  return (
                    <Box key={item.id} sx={headerItem}>
                      <Button
                        style={item.id === panal ? { ...highLightButon } : {}}
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
            <Box sx={lock}>
              <NoEncryptionGmailerrorredIcon sx={{ fontSize: "200px" }} />
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
}
