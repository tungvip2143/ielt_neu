import React, { useState, useEffect } from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import { useFormContext } from "react-hook-form";
import { useFormikContext } from "formik";
//
import ImgHideTotalPage from "assets/image/exam/hide-total-page.png";
import NextQuestion from "assets/image/exam/next-exercise.png";
import PrevQuestion from "assets/image/exam/prev-exercise.png";
//
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//
import { makeStyles } from "@mui/styles";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
//
// ! type
interface Props {
  questions?: any;
  onClickPage?: any;
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
//
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

const CardPage = ({ questions, onClickPage }: Props) => {
  const [highlightPage, setHighlightPage] = React.useState("1");
  const [showPageReview, setShowPageReview] = useState<string>();

  const [checkedReview, setCheckedReview] = useState(false);
  const { values }: any = useFormikContext();
  const classes = useStyles();
  const handleCheckBox = (event: any) => {
    setCheckedReview(event.target.checked);
  };
  useEffect(() => {
    const hanldeHighLightReview = () => {
      if (checkedReview) {
        return setShowPageReview("show-page-review");
      }
      return setShowPageReview("hide-review");
    };
    hanldeHighLightReview();
  }, [checkedReview]);
  const hideReview = () => {
    setCheckedReview(false);
  };
  const renderPartValues = (partValues: any, index: number) => {
    let sectionRender: any = {};

    return partValues?.groups?.map((partGroup: any, groupIndex: number) => {
      return partGroup.questions.map((item: any, index: number) => {
        const handleClickQuestion = (part: any, group: any) => {
          sectionRender.part = partValues.partNumber - 1;
          sectionRender.group = partGroup.groupNumber - 1;
          onClickPage(sectionRender);
          setHighlightPage(item.question.displayNumber);
          hideReview();
        };

        const add = Number(item.question.displayNumber);
        const highLightPage = () => {
          if (highlightPage == item.question.displayNumber) {
            return "high-light-page";
          }
          return classes.eachQuestion;
        };
        const didExerciseActive = () => {
          if (values?.answers[`${add}`]?.studentAnswer) {
            return "did-exercise";
          }
          return;
        };
        return (
          <>
            <Box
              key={item.id}
              className={`${highLightPage()} ${
                highlightPage === item.question.displayNumber && showPageReview
              } ${`${didExerciseActive()}-abc`}`}
              onClick={() => handleClickQuestion(partValues, partGroup)}
            >
              <span className={didExerciseActive()}>{item.question.displayNumber}</span>
            </Box>
          </>
        );
      });
    });
  };
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
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0px 2px" }}>
              {questions?.map((group: any, index: number) => {
                return (
                  <>
                    <div key={group.partNumber} className={classes.eachItem}>
                      <Stack direction="row" spacing={0.2} className="part-item">
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

export default CardPage;
