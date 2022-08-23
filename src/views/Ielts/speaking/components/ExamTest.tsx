import Grid from "@mui/material/Grid";
import CardExercise from "components/Card/CardExercise";
import LoadingPage from "components/Loading";
import { useIeltsSpeaking, useIeltsTestCode, useUploadAudioSpeaking } from "hooks/ielts/useIelts";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CardPage from "./CardPage";
//
import { ROOT_ORIGINAL_URL, ROOT_URL } from "constants/api";
import ReactAudioPlayer from "react-audio-player";
import RecordExam from "./RecordExam";
import { makeStyles } from "@mui/styles";
import SpeakingImageActive from "assets/image/speaking-exam/teach_illustration_active.svg";
import SpeakingImageDeactive from "assets/image/speaking-exam/teach_illustration_deactive.svg";
// @ts-ignore
import { RecordState } from "audio-react-recorder";
import { part, RecordStateEnum } from "interfaces/recorder";
import { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum } from "constants/enum";
import audioService from "services/audioService";
import ieltsService from "services/ieltsService";
import httpServices from "services/httpServices";

type Props = {
  data: any;
  testCode: number;
};

interface RecordState {
  recordState: any;
}

const useStyles = makeStyles((theme) => ({
  audioContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxWidth: "1440px",
    margin: "0 auto",
    justifyContent: "space-between",
  },
  cardExercies: {
    display: "flex",
    justifyContent: "center",
    alignItems: "centr",
  },
}));

const ExamTest = (props: Props) => {
  // !State
  const classes = useStyles();
  const { data, testCode } = props;
  const speakingDatas = data?.data?.data || [];
  const [recordState, setRecordState] = React.useState<RecordState>();
  const [groupSelected, setGroupSelected] = React.useState({
    part: 0,
    group: 0,
    question: 0,
  });
  const { handler } = useStepExam();
  const { mutateAsync: uploadAudioSpeaking, isLoading: uploadAudioLoading } = useUploadAudioSpeaking();

  let partsLength = speakingDatas.length - 1 || 0;
  let groupsLength = speakingDatas[groupSelected.part]?.groups?.length - 1 || 0;
  let questionsLength = speakingDatas[groupSelected.part]?.groups[groupSelected.group]?.questions?.length - 1 || 0;
  let audioPath =
    speakingDatas[groupSelected.part]?.groups[groupSelected.group]?.questions[groupSelected.question]?.question
      .questionAudio;
  let displayNumber =
    speakingDatas[groupSelected.part]?.groups[groupSelected.group]?.questions[groupSelected.question]?.question
      .displayNumber;

  console.log("groupSelected", groupSelected);

  // !Function

  // -----Audio------
  const onEndedAudio = () => {
    onStartRecorder();
  };
  const stop = () => {
    setRecordState({
      recordState: RecordState.STOP,
    });
  };

  // -----Recorder-------

  const onStartRecorder = () => {
    setRecordState({
      recordState: RecordState.START,
    });
  };

  useEffect(() => {
    if (groupSelected.part === part.part1) {
      const timeout = setTimeout(() => {
        stop();
      }, 20000);
      return () => clearTimeout(timeout);
    }
    if (groupSelected.part === part.part2) {
      const timeout = setTimeout(() => {
        stop();
      }, 60000);
      return () => clearTimeout(timeout);
    }
    if (groupSelected.part === part.part3) {
      const timeout = setTimeout(() => {
        stop();
      }, 30000);
      return () => clearTimeout(timeout);
    }
  }, [onStartRecorder]);

  const uploadVideo = async (audio: any) => {
    const questionId =
      speakingDatas[groupSelected.part]?.groups[groupSelected.group]?.questions[groupSelected.question].questionId;

    const formData = new FormData();
    formData.append("userAudioAnswer", audio.blob, "recording.wav");

    await uploadAudioSpeaking(
      { testCode, questionId, body: formData },
      {
        onSuccess: () => {
          if (groupSelected.question < questionsLength) {
            setGroupSelected({ ...groupSelected, question: groupSelected.question + 1 });
            return;
          }
          if (groupSelected.group < groupsLength) {
            setGroupSelected({ ...groupSelected, group: groupSelected.group + 1, question: 0 });
            return;
          }
          if (groupSelected.part < partsLength) {
            setGroupSelected({ ...groupSelected, part: groupSelected.part + 1, group: 0, question: 0 });
            return;
          } else {
            handler?.setStep && handler.setStep(TypeStepExamEnum.STEP3);
            return;
          }
        },
      }
    );
  };

  // !Render
  if (uploadAudioLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Grid container className={classes.container}>
        <CardExercise
          width={5.9}
          className={classes.cardExercies}
          content={
            <div className={classes.audioContent}>
              <ReactAudioPlayer
                onEnded={onEndedAudio}
                src={`${ROOT_ORIGINAL_URL}/${audioPath}`}
                style={{ display: "none" }}
                autoPlay
                controls
              />
              <div>
                {recordState?.recordState === RecordStateEnum.START ? (
                  <img src={SpeakingImageDeactive} alt="speaking image" />
                ) : (
                  <img src={SpeakingImageActive} alt="speaking image" />
                )}
              </div>
            </div>
          }
        />
        <CardExercise
          className={classes.cardExercies}
          width={5.9}
          content={
            <RecordExam partAnswering={groupSelected.part} uploadVideo={uploadVideo} recordState={recordState} />
          }
        />
      </Grid>
      <CardPage displayNumber={displayNumber} questions={speakingDatas} />
    </div>
  );
};

const IeltsSpeakingContainer = () => {
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useIeltsSpeaking(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <ExamTest testCode={testCode} data={data} />;
};

export default IeltsSpeakingContainer;
