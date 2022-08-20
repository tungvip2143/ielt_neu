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
import ReactAudioPlayer from "react-audio-player";
import { ROOT_ORIGINAL_URL } from "constants/api";
type Props = {
  data: any;
};

const ExamTest = (props: Props) => {
  // !State
  const { data } = props;
  const audioDatas = data?.data?.data || [];
  const [numberPage, setNumberPage] = React.useState("1");
  const [groupSelected, setGroupSelected] = React.useState({
    part: 0,
    group: 0,
    question: 0,
  });
  console.log("audioDatas", audioDatas);
  let partLength = audioDatas.length;
  let groupLength = audioDatas[groupSelected.part];

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
            <div>
              {/* <ReactAudioPlayer src={`${ROOT_ORIGINAL_URL}`} autoPlay controls /> */}
              <CardLeft ContentQuestion={partRenderSelected?.groups[groupSelected.group]} numberPage={numberPage} />
            </div>
          }
        />
        <CardExercise width={5.9} content={<CardRight />} />
      </Grid>
      <CardPage questions={data} onClickPage={onClickPage} displayNumber={displayNumber} />
    </div>
  );
};

const IeltsSpeakingContainer = () => {
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useIeltsSpeaking(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <ExamTest data={data} />;
};

export default IeltsSpeakingContainer;
