import LoadingPage from "components/Loading";
import { useIeltsListening } from "hooks/ielts/useIelts";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardExercise from "components/Card/CardExercise";
import CardPart from "components/Card/CardPart";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { Box } from "@mui/system";
import CardPage from "./CardPage";
import ContentQuestion from "./ContentQuestion";
import ReactAudioPlayer from "react-audio-player";
import { ROOT_ORIGINAL_URL } from "constants/api";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";

type Props = {
  data: any;
};

const ExamTest = (props: Props) => {
  //! State
  const { data } = props;
  const audioData = data || [];
  const [idxAudioPlaying, setIdxAudioPlaying] = React.useState(0);

  // const [questions, setQuestions] = React.useState(data || {});

  const [groupSelected, setGroupSelected] = React.useState({
    part: 0,
    group: 0,
    question: 0,
  });
  const [showQuestion, setShowQuestion] = useState("1");
  const part = data;
  const group = audioData[groupSelected.part]?.groups;

  const questionData = audioData[groupSelected.part]?.groups[groupSelected.group]?.questions || [];
  const displayNumber = questionData[groupSelected.question]?.question?.displayNumber;

  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
  };
  const onClickShowQuestion = (displayNumber: any) => {
    setShowQuestion(displayNumber);
  };

  const partRenderSelected = useMemo(() => {
    // const questionsWithPageNumberTemp = data as any;
    if (!isEmpty(audioData[groupSelected?.part])) {
      return audioData[groupSelected?.part];
    }

    return null;
  }, [groupSelected]);

  // useEffect(() => {
  //   let part = groupSelected.part;
  //   let group = groupSelected.group;
  //   let question = groupSelected.question;

  //   setGroupSelected({ ...groupSelected, part, group, question });
  // }, []);

  //! Function
  const onEachAudioEnded = () => {
    if (idxAudioPlaying === audioData.length - 1) {
      return;
    }

    setIdxAudioPlaying(idxAudioPlaying + 1);
  };

  //! Render
  const container = {
    margin: "0 15px",
  };
  const styleHeight = {
    height: themeCssSx.heightExercise.examTest,
  };
  return (
    <>
      <Box sx={container}>
        <CardPart content="Sample Listening (Note Completion)" />
        <div>
          <ReactAudioPlayer
            src={`${ROOT_ORIGINAL_URL}/${audioData[idxAudioPlaying].partAudio}`}
            autoPlay
            controls
            style={{ display: "none" }}
            onEnded={onEachAudioEnded}
          />
        </div>
        <Box sx={{ pt: "16px" }}>
          <CardExercise
            content={
              <ContentQuestion
                ContentQuestion={partRenderSelected?.groups[groupSelected.group]}
                audio={partRenderSelected?.partAudio}
                displayNumber={displayNumber}
              />
            }
            styleAdd={styleHeight}
          />
        </Box>
      </Box>
      <CardPage
        onClickPage={onClickPage}
        questions={audioData}
        setDisplayNumber={onClickShowQuestion}
        groupSelected={groupSelected}
        part={part}
        group={group}
        question={questionData}
        displayNumber={displayNumber}
      />

      {/* <CardPage questions={audioData} onClickPage={onClickPage} /> */}
    </>
  );
};

const IeltsListeningContainer = () => {
  // const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const testCode = useMemo(() => {
    return localStorage.getItem("testCode");
  }, []);

  const { data, isLoading } = useIeltsListening(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <ExamTest data={data?.data.data} />;
};

export default IeltsListeningContainer;
