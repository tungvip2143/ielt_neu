import * as React from "react";
import { dataIlets } from "components/data/dataIelts";
import CardIlets from "components/Card/CardIlets";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TitleIntroExam from "components/TitleIntroExam/TitleIntroExam";
//
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Typography from "@mui/material/Typography";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
//
import Modal from "components/Modal";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
export interface IeltsSectionsProps {}
interface PropsBg3 {
  bg: string;
}
interface propsModal {
  dataModal: {
    id?: number;
    title?: string;
    icon?: React.ReactNode;
  };
}
export interface IeltsSectionsProps {}
const dataModal = [
  {
    id: 1,
    title: "Listening",
    icon: <HeadphonesIcon sx={{ color: themeCssSx.colorIcons.listening, fontSize: themeCssSx.fontIcons.normal }} />,
  },
  {
    id: 2,
    title: "Reading",
    icon: <AutoStoriesIcon sx={{ color: themeCssSx.colorIcons.reading, fontSize: themeCssSx.fontIcons.normal }} />,
  },
  {
    id: 3,
    title: "Writing",
    icon: <CreateIcon sx={{ color: themeCssSx.colorIcons.writing, fontSize: themeCssSx.fontIcons.normal }} />,
  },
  {
    id: 4,
    title: "Speaking",
    icon: <KeyboardVoiceIcon sx={{ color: themeCssSx.colorIcons.speaking, fontSize: themeCssSx.fontIcons.normal }} />,
  },
];
export default function IeltsSections({ bg }: PropsBg3) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>();
  const [isShowIcon, isSetShowIcon] = React.useState<boolean>(false);
  console.log("show-icon", isShowIcon);

  console.log(id);
  const history = useHistory();

  const handleCloseModal = () => setOpen(false);

  const handleBackIeltsSelection = () => {
    if (id === 1) {
      history.push("/ielts/listening");
    } else if (id === 2) {
      history.push("/ielts/reading");
    } else if (id === 3) {
      history.push("/ielts/writing");
    } else if (id === 4) {
      history.push("/ielts/speaking");
    }
  };
  //
  const modalContent = {
    p: "0 10px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    m: "10px  0 20px 0",
  };
  //
  const ItemModal = ({ dataModal }: propsModal) => {
    const title = {
      color: themeCssSx.color.desc.smallGray,
      fontSize: themeCssSx.fontSize.descSmallest,
      fontWeight: 700,
      mb: "8px",
    };
    const line = {
      width: "80%",
      height: "8px",
      background: themeCssSx.bg.gray,
      borderLeft: "2px solid red",
      borderRadius: "2px",
    };
    //

    return (
      <Box sx={{ width: "25%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={id === dataModal.id ? { visibility: "visible" } : { visibility: "hidden" }}>{dataModal.icon}</Box>
        <Typography sx={title}>{dataModal.title}</Typography>
        <Box sx={line}></Box>
      </Box>
    );
  };
  const dataTitleIntroExam = {
    title: "Practice",
    desc: `Practice with accurate IELTS tests
    to improve your score.`,
    background: "rgb(255,245,247)",
  };
  return (
    <Box>
      <Box sx={{ background: "rgb(255,245,247)", p: "50px 0 100px 0" }}>
        <div className="container">
          <Box sx={{ width: "252px", ml: "10px" }}>
            <TitleIntroExam dataTitleIntroExam={dataTitleIntroExam} />
          </Box>
        </div>
      </Box>
      <Box sx={{ background: bg, pb: "100px" }}>
        <div className="container">
          <Grid container sx={{ transform: "translateY(-40px)" }}>
            {dataIlets.map(
              (item: {
                id: number;
                typeExam: string;
                timeExam: string;
                nameExam: string;
                image: string;
                hoverColor: string;
                path: string;
              }) => {
                const handleShowModal = () => {
                  setOpen(true);
                  setId(item.id);
                };
                return <CardIlets onClick={handleShowModal} key={item.id} exam={item} />;
              }
            )}
          </Grid>
        </div>
        {open && (
          <Modal onClose={handleCloseModal} open={open} width="388px">
            <Modal.Title sx={{ color: "#000000" }}>Would you like to resume your unfinished test?</Modal.Title>
            <Modal.Content>
              <Box sx={modalContent}>
                <Stack direction="row" spacing={1} sx={{ p: "12px 0 16px 0" }}>
                  {dataModal.map((item: any) => {
                    return <ItemModal dataModal={item} />;
                  })}
                </Stack>
              </Box>
            </Modal.Content>
            <Modal.Button
              onCancel={handleBackIeltsSelection}
              onConfirm={handleCloseModal}
              cancel="NO, START NEW"
              confirm="YES, RESUME"
              background="#df0a31"
              color=""
            />
          </Modal>
        )}
      </Box>
    </Box>
  );
}
