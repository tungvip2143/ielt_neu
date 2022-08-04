import React, { useEffect } from "react";
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
import { dataDummy, ieltsReadingDataDummy } from "api/ieltsResults";
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
    console.log("id test", id);
    setQuestionSelected(id);
  };

  const onClickPart = (part: string) => {
    setPartSelected(part);
    console.log("part", part);
  };

  //
  const partRenderSelected = useMemo(() => {
    const questionsWithPageNumberTemp = ieltsReadingDataDummy as any;
    if (!isEmpty(questionsWithPageNumberTemp[partSelected])) {
      return questionsWithPageNumberTemp[partSelected];
    }

    return null;
  }, [ieltsReadingDataDummy, partSelected]);
  //

  //! Render
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Grid container sx={{ justifyContent: "space-between", p: "20px 0" }}>
          <CardExercise content={<CardLeft dataChangePart={partRenderSelected} />} />
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
        questions={ieltsReadingDataDummy}
      />
    </Box>
  );
};

export default Step2ExamContent;
