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

type Props = {
  data: any;
};

const ExamTest = (props: Props) => {
  //! State
  const { data } = props;
  const [questions, setQuestions] = useState(data?.data?.data);

  // const initialQuestion = questions[0]?.groups[0]?.questions[0]?.questionId;
  const [groupSelected, setGroupSelected] = useState({
    part: 0,
    group: 0,
    question: 0,
  });
  const [showQuestion, setShowQuestion] = useState("1");
  const part = data;
  const group = questions[groupSelected.part]?.groups;

  const questionData = questions[groupSelected.part]?.groups[groupSelected.group]?.questions || [];
  const displayNumber = questionData[groupSelected.question]?.question?.displayNumber;
  // !
  const audioData = data?.data.data || [];
  const [idxAudioPlaying, setIdxAudioPlaying] = React.useState(0);
  //
  console.log("groupSelected", groupSelected);
  //
  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
  };
  const onClickShowQuestion = (displayNumber: any) => {
    setShowQuestion(displayNumber);
  };

  const partRenderSelected = useMemo(() => {
    // const questionsWithPageNumberTemp = data as any;
    if (!isEmpty(data?.data?.data[groupSelected?.part])) {
      return data?.data?.data[groupSelected?.part];
    }

    return null;
  }, [groupSelected]);

  useEffect(() => {
    let part = groupSelected.part;
    let group = groupSelected.group;
    let question = groupSelected.question;

    setGroupSelected({ ...groupSelected, part, group, question });
  }, []);

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
              />
            }
          />
        </Box>
      </Box>
      <CardPage
        onClickPage={onClickPage}
        questions={questions}
        setDisplayNumber={onClickShowQuestion}
        groupSelected={groupSelected}
        part={questions}
        group={group}
        question={questionData}
        displayNumber={displayNumber}
      />
    </>
  );
};

const IeltsListeningContainer = () => {
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useIeltsListening(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <ExamTest data={data} />;
};

export default IeltsListeningContainer;
