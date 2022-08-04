import React from "react";
import { dataLeft } from "./DataLeftChangePart";
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
  const [questionSelected, setQuestionSelected] = useState<any>(questions.part1[0].id);
  const [partSelected, setPartSelected] = useState<any>("part1");

  console.log("questionSelected2", questionSelected);
  //

  const onClickPage = (id: string) => {
    // console.log("id test", id);
    setQuestionSelected(id);
  };

  const onClickPart = (part: string) => {
    setPartSelected(part);
  };

  console.log("questions", questions);
  const questionsWithPageNumber = useMemo(() => {
    let index = 0;

    return Object.entries(questions).reduce((obj, el) => {
      const [part, questionEachPart] = el as any;
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

  const dataTest = () => {
    const setDataChangeLeftPart = dataLeft as any;
    if (!isEmpty(setDataChangeLeftPart[partSelected])) {
      return setDataChangeLeftPart[partSelected];
    }
    return null;
  };

  //
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
          <CardExercise content={<CardLeft dataChangePart={dataTest()} />} />
          <CardExercise
            content={
              <TOFFL
                onClickPage={onClickPage}
                questionSelected={questionSelected}
                partRenderSelected={partRenderSelected}
              />
            }
          />
        </Grid>
      </Box>

      <CardTotalPageExams
        questionSelected={questionSelected}
        onClickPart={onClickPart}
        onClickPage={onClickPage}
        questions={questionsWithPageNumber}
      />
    </Box>
  );
};

export default Step2ExamContent;
