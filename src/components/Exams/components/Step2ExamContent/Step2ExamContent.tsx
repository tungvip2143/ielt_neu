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
import { group } from "console";
import { IELT_TEST } from "interfaces/testType";
import Writing from "views/Ielts/writing/component/Writing";
import CardPart from "components/Card/CardPart";
import ReactHtmlParser from "react-html-parser";
import { useFormikContext } from "formik";

interface Props {
  data?: any;
}

const Step2ExamContent = (props: any) => {
  const { data, test } = props;
  console.log("test", test);
  console.log("step2 data", data);

  //! State
  const [questions, setQuestions] = useState(data);
  console.log("question", questions);

  // const initialQuestion = questions[0]?.groups[0]?.questions[0]?.questionId;
  const [questionSelected, setQuestionSelected] = useState<any>("1");
  const [groupSelected, setGroupSelected] = useState({
    part: 0,
    group: 0,
  });

  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
    console.log("groupRenderSelected", groupRenderSelected);
  };

  const onClickPart = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
    console.log("part", groupRenderSelected);
  };

  const partRenderSelected = useMemo(() => {
    console.log("group select", groupSelected);
    const questionsWithPageNumberTemp = questions as any;
    if (!isEmpty(questionsWithPageNumberTemp[groupSelected?.part])) {
      return questionsWithPageNumberTemp[groupSelected?.part];
    }

    return null;
  }, [ieltsReadingDataDummy, groupSelected]);

  //
  console.log("partRenderSelected11", partRenderSelected);
  //! Render
  return (
    <>
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <CardPart part={groupSelected.part + 1}>
          {/* {ReactHtmlParser(partRenderSelected?.groups[groupSelected.group]?.directionText)} */}
        </CardPart>
      </Box>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ width: "80%", margin: "0 auto" }}>
          <Grid container sx={{ justifyContent: "space-between", p: "20px 0" }}>
            <CardExercise content={<CardLeft test={test} dataChangePart={partRenderSelected} />} />
            {test === IELT_TEST.WRITING && (
              <CardExercise
                content={<Writing questionId={partRenderSelected?.questionId} groupSelected={groupSelected} />}
              />
            )}
            {test === IELT_TEST.READING && (
              <CardExercise
                content={
                  <TOFFL
                    onClickPage={onClickPage}
                    questionSelected={questionSelected}
                    partRenderSelected={partRenderSelected?.groups[groupSelected.group]}
                  />
                }
              />
            )}
          </Grid>
        </Box>

        <CardTotalPageExams
          questionSelected={questionSelected}
          onClickPart={onClickPart}
          onClickPage={onClickPage}
          questions={questions}
          test={test}
        />
      </Box>
    </>
  );
};

export default Step2ExamContent;
