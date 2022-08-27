import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardIlets from "components/Card/CardIlets";
import { dataIlets } from "components/data/dataIelts";
import TitleIntroExam from "components/TitleIntroExam/TitleIntroExam";
import * as React from "react";
//
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Typography from "@mui/material/Typography";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
//
import Stack from "@mui/material/Stack";
import Modal from "components/Modal";
import { useHistory } from "react-router-dom";
//
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useFormikContext } from "formik";
import useGetQuerystring from "hooks/useGetQuerystring";
import { useFinishIeltsReadingTest, useGetExamination } from "hooks/ielts/useIelts";
import { Button } from "@mui/material";
import useGetNameExam from "hooks/ielts/useGetNameExamHook";

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

const useStyles = makeStyles((theme) => ({
  containerTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContent: {
    p: "0 10px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    m: "10px  0 20px 0",
  },
  title: {
    color: themeCssSx.color.desc.smallGray,
    fontSize: themeCssSx.fontSize.descSmallest,
    fontWeight: 700,
    mb: "8px",
  },

  line: {
    width: "80%",
    height: "8px",
    background: themeCssSx.bg.gray,
    borderLeft: "2px solid red",
    borderRadius: "2px",
  },
  examSemester: {
    width: "252px",
    marginLeft: "10px",
  },
}));

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

const initialValues = {
  exam: {
    name: "",
    id: "",
  },
};

const validationSchema = yup.object().shape({
  exam: yup.object().shape({
    label: yup.string().required("Please choose exam before start"),
  }),
});

const initialFilter = {
  page: 1,
  pageSize: 10,
};

export default function IeltsSections({ bg }: PropsBg3) {
  // !State
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>(0);
  const [isSelectExam, setIsSelectExam] = React.useState<boolean>(false);
  const { data, isLoading } = useGetExamination(initialFilter);
  const examinations = data?.data?.data?.data || [];

  const { mutateAsync: finishIeltsReading, isLoading: readingLoading } = useFinishIeltsReadingTest();
  console.log("examination", examinations);
  console.log("loading", isLoading);

  // console.log("fnsjdfds", id);
  const history = useHistory();
  const queries = useGetQuerystring();
  console.log("queries", queries);
  // console.log("history", idExam);
  const examinationName = localStorage.getItem("examinationName") || "";
  const { examName: reading } = useGetNameExam("READING");
  const { examName: writing } = useGetNameExam("WRITING");
  const { examName: speaking } = useGetNameExam("SPEAKING");
  const { examName: listening } = useGetNameExam("LISTENING");

  const finisdedTest = React.useMemo(() => {
    return reading && writing && listening && speaking;
  }, []);

  const handleCloseModal = () => setOpen(false);

  const testCode = React.useMemo(() => {
    return localStorage.getItem("testCode");
  }, []);

  const endTest = async () => {
    await finishIeltsReading(testCode, {
      onSuccess: () => {
        localStorage.removeItem("READING");
        localStorage.removeItem("SPEAKING");
        localStorage.removeItem("LISTENING");
        localStorage.removeItem("WRITING");
        localStorage.removeItem("testCode");
        history.push(`/ielts/scores`);
      },
    });
  };

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
  const ItemModal = ({ dataModal }: propsModal) => {
    return (
      <Box sx={{ width: "25%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={id === dataModal.id ? { visibility: "visible" } : { visibility: "hidden" }}>{dataModal.icon}</Box>
        <Typography className={classes.title}>{dataModal.title}</Typography>
        <Box className={classes.line}></Box>
      </Box>
    );
  };
  const dataTitleIntroExam = {
    title: "Practice",
    desc: `Practice with accurate IELTS tests
    to improve your score.`,
    background: "rgb(255,245,247)",
  };
  const styleModal = {
    padding: "20px",
  };

  const onSubmitExam = (values: any) => {
    console.log("values", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmitExam(values)}
    >
      {(formik: any) => {
        return (
          <Form>
            <Box>
              <Box sx={{ background: "rgb(255,245,247)", p: "50px 0 100px 0" }}>
                <div className="container">
                  <Box className={classes.containerTitle}>
                    <Box sx={{ width: { xs: "100%", lg: "300px" }, ml: "10px" }}>
                      <TitleIntroExam
                        examinationName={examinationName}
                        dataTitleIntroExam={dataTitleIntroExam}
                        idExam={queries.exam}
                      />
                    </Box>
                    <Button disabled={!finisdedTest} onClick={endTest} variant="outlined">
                      Finish Test
                    </Button>
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
                          // setOpen(true);
                          setId(item.id);
                        };
                        return (
                          <CardIlets
                            onSelectExam={isSelectExam}
                            onClick={handleShowModal}
                            key={item.id}
                            exam={item}
                            id={item.id}
                          />
                        );
                      }
                    )}
                  </Grid>
                </div>
                {open && (
                  <Modal onClose={handleCloseModal} open={open} width="388px" styleModal={styleModal}>
                    <Modal.Title sx={{ color: "#000000" }}>Would you like to resume your unfinished test?</Modal.Title>
                    <Modal.Content>
                      <Box className={classes.modalContent}>
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
          </Form>
        );
      }}
    </Formik>
  );
}
