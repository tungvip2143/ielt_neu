import React, { useState, useEffect } from "react";
//
import { ieltsApi } from "api/ieltsResults";
//
import Text from "components/Typography/index";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//
import ItemQuestion from "components/StepsWorkExercise/Step1/CardItem";
import TitleExam from "components/StepsWorkExercise/TitleExam/TitleExam";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";

//
// !type
interface TOFFLI {
  partRenderSelected?: any;
  questionSelected?: any;
  onClickPage: (id: string) => void;
  onHightLightNumberPage: (displayNumber: string) => void;
  showQuestion?: any;
}

const TOFFL = ({ partRenderSelected, questionSelected, onClickPage, showQuestion, onHightLightNumberPage }: TOFFLI) => {
  console.log("showQuestion", showQuestion);
  // console.log(partRenderSelected.questions.group?.[0]?.index);
  const [expanded, setExpanded] = useState(showQuestion);
  const [dataPartGruop, setDataPartGroup] = useState();
  console.log("partRenderSelected2", partRenderSelected);
  console.log("questionSelected", questionSelected);

  //! Number

  const from = () => {
    // partRenderSelected?.questions[0]?.map((item: any) => {
    //   console.log("item");
    // });
  };

  useEffect(() => {
    from();
  }, []);
  const dataNumber = {
    from: "1",
    to: "6",
  };
  //
  const handleCollapse = (id: any) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? id : false);
    onClickPage(id);
  };
  useEffect(() => {
    setExpanded(showQuestion);
  }, [showQuestion]);
  // useEffect(() => {
  //   setExpanded(questionSelected);
  // }, [questionSelected]);
  //
  const renderPartValueGroup = (partRenderSelected: any) => {
    console.log("partRenderSelected", partRenderSelected);
    const questionType = partRenderSelected?.questionType;
    console.log("questionType", questionType);
    if (
      questionType === QUESTION_TYPE.SUMMARY_COMPLETION ||
      questionType === QUESTION_TYPE.NOTE_COMPLETION ||
      questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION ||
      questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM ||
      questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS
    ) {
      return (
        <ItemQuestion
          image={partRenderSelected?.image}
          questionType={questionType}
          questionBox={partRenderSelected?.questionBox}
          question={partRenderSelected?.questions}
        />
      );
    }
    return partRenderSelected?.questions?.map((question: any) => {
      console.log("abc", question);
      return (
        <>
          <ItemQuestion
            key={question._id}
            question={question}
            questionType={questionType}
            expanded={expanded}
            onCollapse={handleCollapse}
            questionBox={partRenderSelected?.questionBox}
            onHightLightNumberPage={onHightLightNumberPage}
          />
        </>
      );
    });
  };

  //! Render
  return (
    <Box>
      <TitleExam dataNumber={dataNumber} title={partRenderSelected} />
      <Stack direction="column" spacing={1} sx={{ pb: "100px" }}>
        {renderPartValueGroup(partRenderSelected)}
        {/* {partRenderSelected.map((item: any) => {
          return <ItemQuestion expanded={expanded} onCollapse={handleCollapse} key={item.id} question={item} />;
        })} */}
      </Stack>
    </Box>
  );
};

export default TOFFL;
