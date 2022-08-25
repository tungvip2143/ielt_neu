import LoadingPage from "components/Loading";
import { useIeltsListening } from "hooks/ielts/useIelts";
import React, { useEffect } from "react";
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
import useState from "react";

type Props = {
  data: any;
};

const ExamTest = (props: Props) => {
  //! State
  const { data } = props;

  const audioData = data?.data.data || [];
  const [idxAudioPlaying, setIdxAudioPlaying] = React.useState(0);

  // const [questions, setQuestions] = React.useState(data || {});

  const [groupSelected, setGroupSelected] = React.useState({
    part: 0,
    group: 0,
  });
  //
  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
  };

  const partRenderSelected = useMemo(() => {
    // const questionsWithPageNumberTemp = data as any;
    if (!isEmpty(data?.data?.data[groupSelected?.part])) {
      return data?.data?.data[groupSelected?.part];
    }

    return null;
  }, [groupSelected]);

  useEffect(() => {
    let part = groupSelected.part + 1;
    setGroupSelected({ ...groupSelected, part });
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
      <CardPage questions={data?.data?.data} onClickPage={onClickPage} />
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
