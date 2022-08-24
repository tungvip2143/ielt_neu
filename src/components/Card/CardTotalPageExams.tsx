import { useState, useEffect } from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
//
import { makeStyles } from "@mui/styles";
import { useFormikContext } from "formik";
import { IELT_TEST } from "interfaces/testType";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
//
import ImgHideTotalPage from "assets/image/exam/hide-total-page.png";
import ForwardIcon from "@mui/icons-material/Forward";
import NextQuestion from "assets/image/exam/next-exercise.png";
import PrevQuestion from "assets/image/exam/prev-exercise.png";

interface CardTotalPageExamsI {
  questions?: any;
  onClickPage?: any;
  onClickPart?: any;
  setDisplayNumber?: any;
  questionSelected?: any;
  hightLightNumberPage?: any;
  test?: any;
  onClickPageNumber?: any;
}

const box = {
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  width: "80%",
  display: { xs: "none", lg: "block" },
  borderRadius: "8px 8px 0 0",
  border: "1px solid #fff",
  background: themeCssSx.backgroundExam.content,
};
const TotalPage = {
  display: "flex",
  width: "100%",
  position: "fixed",
  bottom: { xs: "0", lg: "0px" },
  margin: "0 15px",
};
const containerTotalPage = {
  ...themeCssSx.flexBox.flexBetweenCenter,
  p: "5px 10px",
};
const useStyles = makeStyles((theme) => {
  return {
    eachItem: {
      display: "flex",
    },
    eachQuestion: {
      background: "#000",
      color: "#fff",
      width: "23px",
      height: "23px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
      borderRadius: "2px",
    },
  };
});
const nextPage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  transform: "rotate(180deg)",
  cursor: "pointer",
  boxShadow:
    "rgba(0, 0, 0, 0.03) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.03) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.03) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.02) 0px 2px 1px, rgba(0, 0, 0, 0.01) 0px 4px 2px, rgba(0, 0, 0, 0.01) 0px 8px 4px, rgba(0, 0, 0, 0.01) 0px 16px 8px, rgba(0, 0, 0, 0.01) 0px 32px 16px",
};

const containerNextPage = {
  display: "flex",
  justifyContent: "flex-end",
  width: "13%",
};
const didExercise = {
  background: "#90caf9 ",
  borderRadius: "2px",
  position: "relative",
  "&::affter": {
    position: "absolute",
    display: "block",
    content: "fsdfdsf",
    bottom: "10px",
    width: "100%",
    height: "1px",
    background: "#333",
  },
};
const CardTotalPageExams = ({
  questions,
  onClickPart,
  onClickPage,
  test,
  setDisplayNumber,
  hightLightNumberPage,
  onClickPageNumber,
}: CardTotalPageExamsI) => {
  const [highlightPage, setHighlightPage] = useState("1");
  const [itemShowReview, setItemShowReview] = useState<string>();
  const [showPageReview, setShowPageReview] = useState<string>();
  const [checkedReview, setCheckedReview] = useState(false);
  useEffect(() => {
    const hanldeHighLightReview = () => {
      if (checkedReview) {
        return setShowPageReview("show-page-review");
      }
      return setShowPageReview("hide-review");
    };
    hanldeHighLightReview();
  }, [checkedReview]);
  //! State
  const classes = useStyles();
  //
  const getItem = (item: string) => {
    setItemShowReview(item);
  };

  console.log("fdsfsd", checkedReview);
  const handleCheckBox = (event: any) => {
    setCheckedReview(event.target.checked);
  };
  //
  const hideReview = () => {
    setCheckedReview(false);
  };
  //
  const renderPartValues = (partValues: any, index: number) => {
    const { values }: any = useFormikContext();
    let sectionRender: any = {};
    if (test === IELT_TEST.WRITING) {
      const handleClickQuestion = (part: any, group: any) => {
        sectionRender.part = index;
        onClickPage(sectionRender);
        setHighlightPage(partValues.question.displayNumber);
      };
      const hightLightDidTheHomework = () => {
        const add = Number(partValues.question.displayNumber) - 1;

        if (highlightPage === partValues.question.displayNumber) {
          return { background: "#4C80F1", borderRadius: "2px" };
        }
        if (values?.answers[`${add}`]?.studentAnswer) {
          return didExercise;
        }
      };

      return (
        <>
          <Box
            key={partValues.id}
            className={classes.eachQuestion}
            onClick={() => handleClickQuestion(partValues, index)}
            sx={hightLightDidTheHomework()}
            // style={values.answers[]}
          >
            <span>{partValues.question.displayNumber}</span>
          </Box>
        </>
      );
    }

    return partValues?.groups?.map((partGroup: any, groupIndex: number) => {
      return partGroup.questions.map((item: any, index: number) => {
        const handleClickQuestion = (part: any, group: any) => {
          sectionRender.part = partValues.partNumber - 1;
          sectionRender.group = partGroup.groupNumber - 1;
          onClickPage(sectionRender);
          onClickPageNumber(item.question.displayNumber);
          setDisplayNumber(item.question.displayNumber);
          getItem(item.question.displayNumber);
          hideReview();
        };
        const add = Number(item.question.displayNumber) - 1;

        const didExerciseActive = () => {
          if (hightLightNumberPage == item.question.displayNumber) {
            return "high-light-page";
          }
          if (values?.answers[`${add}`]?.studentAnswer) {
            return "did-exercise";
          }
          return classes.eachQuestion;
        };
        return (
          <>
            <Box
              key={item.id}
              className={`${didExerciseActive()} ${showPageReview}`}
              onClick={() => handleClickQuestion(partValues, partGroup)}
            >
              <span>{item.question.displayNumber}</span>
            </Box>
          </>
        );
      });
    });
  };
  //! Effect

  //! Render
  return (
    <>
      <Box className="quang-test" sx={TotalPage}>
        <Box>
          <FormControlLabel
            value=""
            control={<Checkbox checked={checkedReview} onChange={handleCheckBox} />}
            label="Review"
          />
        </Box>
        <Box sx={box}>
          <Box sx={containerTotalPage}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {questions?.map((group: any, index: number) => {
                return (
                  <>
                    <div key={group.partNumber} className={classes.eachItem}>
                      <Stack direction="row" spacing={0.2}>
                        {renderPartValues(group, index)}
                      </Stack>
                    </div>
                  </>
                );
              })}

              <Box sx={{ width: { md: "20%" } }}></Box>
            </Box>
            <img src={ImgHideTotalPage} alt="" />
          </Box>
        </Box>
        <Stack direction="row" spacing={2} sx={containerNextPage}>
          <Box sx={nextPage}>
            <img src={NextQuestion} alt="" />
          </Box>
          <Box sx={nextPage}>
            <img src={PrevQuestion} alt="" />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default CardTotalPageExams;
