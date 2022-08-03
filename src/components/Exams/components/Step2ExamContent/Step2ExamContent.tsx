import React from "react";
//
import Box from "@mui/material/Box";
import CardExercise from "components/Card/CardExercise";
import CardLeft from "components/StepsWorkExercise/Step1/CardLeft";
import TOFFL from "views/TOFFL/index";
import Grid from "@mui/material/Grid";
//
import CardTotalPageExams from "components/Card/CardTotalPageExams";
import { useState } from "react";
import { dataDummy } from "api/ieltsResults";
import { isEmpty } from "lodash";
import { useMemo } from "react";

const Step2ExamContent = (props: any) => {
  //! State
  const [questions, setQuestions] = useState(dataDummy);
  const [questionSelected, setQuestionSelected] = useState("1");
  const [partSelected, setPartSelected] = useState<any>("part3");
  //

  const onClickPage = (id: string) => {
    // console.log("id test", id);
    setQuestionSelected(id);
  };

  const onClickPart = (part: string) => {
    setPartSelected(part);
  };

  const questionsWithPageNumber = useMemo(() => {
    let index = 0;
    return Object.entries(questions).reduce((obj, el) => {
      {
        console.log("obj", obj);
      }
      {
        console.log("el", el);
      }

      const [part, questionEachPart] = el as any;
      console.log("part", part);
      console.log("questionEachPart", questionEachPart);

      questionEachPart.forEach((q: any) => {
        console.log("q", q);

        index = index + 1;
        q.index = index;
      });

      obj = {
        ...obj,
        [part]: questionEachPart,
      };
      return obj;
    }, {});
  }, [questions]);
  //
  const dataLeft = () => {
    if ("part1") {
      return { quang: "quang" };
    }
  };

  const partRenderSelected = useMemo(() => {
    const questionsWithPageNumberTemp = questionsWithPageNumber as any;
    console.log(questionsWithPageNumberTemp);

    if (!isEmpty(questionsWithPageNumberTemp[partSelected])) {
      return questionsWithPageNumberTemp[partSelected];
    }

    return null;
  }, [questionsWithPageNumber, partSelected]);
  //

  //! Render
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Grid container sx={{ justifyContent: "space-between", p: "20px 0" }}>
          <CardExercise content={<CardLeft dataChangePart={partRenderSelected} />} />
          <CardExercise
            content={<TOFFL questionSelected={questionSelected} partRenderSelected={partRenderSelected} />}
          />
        </Grid>
      </Box>

      <CardTotalPageExams onClickPart={onClickPart} onClickPage={onClickPage} questions={questionsWithPageNumber} />
    </Box>
  );
};

export default Step2ExamContent;
