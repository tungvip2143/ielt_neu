import React from "react";
import LoadingPage from "components/Loading";
import { useIeltsListening, useIeltsSpeaking } from "hooks/ielts/useIelts";
import { useSelector } from "react-redux";
import CardExercise from "components/Card/CardExercise";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardRight from "./CardRight";
import CardLeft from "./CardLeft";
import CardPage from "./CardPage";
//
import { isEmpty } from "lodash";
import { useMemo } from "react";
type Props = {};

const ExamTest = (props: Props) => {
  const [numberPage, setNumberPage] = React.useState("1");
  console.log("numberPage", numberPage);

  // !State
  const [groupSelected, setGroupSelected] = React.useState({
    part: 0,
    group: 0,
  });
  console.log("groupSelected", groupSelected);
  //
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useIeltsSpeaking(testCode);
  console.log("data", data);

  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
    console.log("groupRenderSelected", groupRenderSelected);
  };
  const displayNumber = (displayNumber: any) => {
    setNumberPage(displayNumber);
  };
  //
  const partRenderSelected = useMemo(() => {
    // console.log("group select", groupSelected);
    const questionsWithPageNumberTemp = (data?.data?.data as any) || [];
    if (!isEmpty(questionsWithPageNumberTemp[groupSelected?.part])) {
      return questionsWithPageNumberTemp[groupSelected?.part];
    }

    return null;
  }, [groupSelected]);
  //
  if (isLoading) {
    return <LoadingPage />;
  }
  //
  const container = {
    width: "90%",
    maxWidth: "1440px",
    margin: "0 auto",
    justifyContent: "space-between",
  };
  return (
    <div>
      <Grid container sx={container}>
        <CardExercise
          width={5.9}
          content={
            <CardLeft ContentQuestion={partRenderSelected?.groups[groupSelected.group]} numberPage={numberPage} />
          }
        />
        <CardExercise width={5.9} content={<CardRight />} />
      </Grid>
      <CardPage questions={data} onClickPage={onClickPage} displayNumber={displayNumber} />
    </div>
  );
};

export default ExamTest;
