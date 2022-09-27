import { Box } from "@mui/system";
import CardExercise from "components/Card/CardExercise";
import LoadingPage from "components/Loading";
import { ROOT_ORIGINAL_URL } from "constants/api";
import { useFormikContext } from "formik";
import { getErrorMsg } from "helpers";
import { showError } from "helpers/toast";
import useSagaCreators from "hooks/useSagaCreators";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useQuery } from "react-query";
import { authActions } from "redux/creators/modules/auth";
import cacheService from "services/cacheService";
import ieltsService from "services/ieltsService";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import { AllQuestionsDataI } from "../../../../constants/typeData.types";
import CardPage from "./CardPage";
import ContentQuestion from "./ContentQuestion";

interface AllQuestionsDataPropsI {
  data: AllQuestionsDataI[];
  valueVolum?: number;
  prevStep?: any;
}
interface ExamTest {
  valueVolum: number;
  prevStep: any;
}

const ExamTest = (props: AllQuestionsDataPropsI) => {
  //! State
  const { data, valueVolum, prevStep } = props;
  const audioData = data || [];
  const dataCache = cacheService.getDataCache();
  const { idxAudioPlaying: initialAudioIndxPlaying } = dataCache;
  const audioInitialIndex = initialAudioIndxPlaying ? initialAudioIndxPlaying : 0;

  const [idxAudioPlaying, setIdxAudioPlaying] = React.useState(audioInitialIndex);
  const { values, handleSubmit, setFieldValue } = useFormikContext();

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

  let inputIndex = 0;
  useEffect(() => {
    data.map((part: any) => {
      return part.groups.map((group: any) => {
        return group.questions.map((question: any) => {
          inputIndex++;
          setFieldValue(`answers[${inputIndex - 1}].studentAnswer`, question.studentAnswer ?? "");
        });
      });
    });
  }, []);

  //
  useEffect(() => {
    cacheService.cache("idxAudioPlaying", idxAudioPlaying);
  }, [values, idxAudioPlaying]);

  useEffect(() => {
    handleSubmit();
  }, [displayNumber]);

  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
  };
  const onClickShowQuestion = (displayNumber: any) => {
    setShowQuestion(displayNumber);
  };

  const partRenderSelected = useMemo(() => {
    if (!isEmpty(audioData[groupSelected?.part])) {
      return audioData[groupSelected?.part];
    }

    return { groups: [], partAudio: "" };
  }, [groupSelected]);

  //! Function
  const onEachAudioEnded = () => {
    if (idxAudioPlaying === audioData.length - 1) {
      return;
    }

    setIdxAudioPlaying(idxAudioPlaying + 1);
  };

  useEffect(() => {
    const audio: any = document.getElementById("audio");
    const cache = cacheService.getDataCache();
    const current_time = cache?.audio_current_time;
    current_time ? (audio.currentTime = current_time) : (audio.currentTime = 0);
    const setAudioCurrentTime = () => {
      cacheService.cache("audio_current_time", audio.currentTime);
    };

    window.addEventListener("beforeunload", setAudioCurrentTime);

    return () => window.removeEventListener("beforeunload", setAudioCurrentTime);
  }, []);

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
        {/* <TypeQuestions content={questionType} /> */}
        <div>
          <ReactAudioPlayer
            src={`${ROOT_ORIGINAL_URL}/${audioData[idxAudioPlaying]?.partAudio}`}
            autoPlay
            controls
            style={{ display: "none" }}
            onEnded={onEachAudioEnded}
            volume={valueVolum}
            id="audio"
          />
        </div>
        <Box>
          <CardExercise
            content={
              <ContentQuestion
                partTypeQuestions={partRenderSelected.groups[groupSelected.group]}
                audio={partRenderSelected.partAudio}
                displayNumber={displayNumber}
                onClickPage={onClickPage}
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
    </>
  );
};

const IeltsListeningContainer = ({ valueVolum, prevStep }: ExamTest) => {
  const { dispatch } = useSagaCreators();

  const testCode = useMemo(() => {
    return localStorage.getItem("testCode");
  }, []);

  const { data, isLoading } = useQuery("get ielts listening data", () => ieltsService.getIeltsListening(testCode), {
    onSuccess: () => {
      cacheService.cache("skill", "LISTENING");
    },
    onError: (error) => {
      showError(getErrorMsg(error));

      localStorage.removeItem("testCode");
      setTimeout(() => {
        dispatch(authActions.logout);
      }, 1000);
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return <ExamTest valueVolum={valueVolum} prevStep={prevStep} data={data?.data.data} />;
};

export default IeltsListeningContainer;
