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

type Props = {};

const ExamTest = (props: Props) => {
  //! State
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useIeltsListening(testCode);
  const audioData = data?.data.data || [];
  const [idxAudioPlaying, setIdxAudioPlaying] = React.useState(0);
  // const [questions, setQuestions] = React.useState(data || {});
  console.log("data124", data?.data.data);

  console.log("dataListening ", data);
  const [groupSelected, setGroupSelected] = React.useState({
    part: 0,
    group: 0,
  });
  //
  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
    console.log("groupRenderSelected", groupRenderSelected);
  };

  const partRenderSelected = useMemo(() => {
    console.log("group select", groupSelected);
    // const questionsWithPageNumberTemp = data as any;
    if (!isEmpty(data?.data?.data[groupSelected?.part])) {
      return data?.data?.data[groupSelected?.part];
    }

    return null;
  }, [groupSelected]);

  console.log("partRenderSelected", partRenderSelected);

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
  if (isLoading) {
    return <LoadingPage />;
  }

  const container = {
    width: "90%",
    maxWidth: "1440px",
    margin: "0 auto",
  };

  return (
    <>
      <Box sx={container}>
        <CardPart part={groupSelected.part + 1} />
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
      <CardPage dataQuestions={data} onClickPage={onClickPage} />
    </>
  );
};

export default ExamTest;
