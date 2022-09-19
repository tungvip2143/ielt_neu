import { Box } from "@mui/system";
import CardExercise from "components/Card/CardExercise";
import TypeQuestions from "components/Card/TypeQuestions";
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
import CardPage from "./CardPage";
import ContentQuestion from "./ContentQuestion";
import { AllQuestionsDataI } from "../../../../constants/typeData.types";

interface AllQuestionsDataPropsI {
  data: AllQuestionsDataI[];
  valueVolum?: number;
}

const ExamTest = (props: AllQuestionsDataPropsI) => {
  //! State
  const { data, valueVolum } = props;

  const audioData = data || [];
  const dataCache = cacheService.getDataCache();
  const { idxAudioPlaying: initialAudioIndxPlaying } = dataCache;
  const audioInitialIndex = initialAudioIndxPlaying ? initialAudioIndxPlaying : 0;
  const [idxAudioPlaying, setIdxAudioPlaying] = React.useState(0);
  const { values } = useFormikContext();

  // console.log("formik value", values);
  const [groupSelected, setGroupSelected] = React.useState({
    part: 0,
    group: 0,
    question: 0,
  });
  const [questionType, setQuestionType] = useState<string>();

  const part = data;
  const group = audioData[groupSelected.part]?.groups;

  const questionData = audioData[groupSelected.part]?.groups[groupSelected.group]?.questions || [];
  const displayNumber = questionData[groupSelected.question]?.question?.displayNumber;

  useEffect(() => {
    cacheService.cache("answers", values);
    cacheService.cache("idxAudioPlaying", idxAudioPlaying);
  }, [values, idxAudioPlaying]);

  const onClickPage = (groupRenderSelected: object) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
  };

  const onClickQuestionType = (questionType: string) => {
    setQuestionType(questionType);
  };

  const partRenderSelected = useMemo(() => {
    if (!isEmpty(audioData[groupSelected?.part])) {
      return audioData[groupSelected?.part];
    }

    return null;
  }, [groupSelected]);

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
        <TypeQuestions content={questionType} />
        <div>
          <ReactAudioPlayer
            src={`${ROOT_ORIGINAL_URL}/${audioData[idxAudioPlaying]?.partAudio}`}
            autoPlay
            controls
            style={{ display: "none" }}
            onEnded={onEachAudioEnded}
            volume={valueVolum}
          />
        </div>
        <Box>
          <CardExercise
            content={
              <ContentQuestion
                ContentQuestion={partRenderSelected?.groups[groupSelected.group]}
                audio={partRenderSelected?.partAudio}
                displayNumber={displayNumber}
                onClickPage={onClickPage}
                onClickQuestionType={onClickQuestionType}
              />
            }
            styleAdd={styleHeight}
          />
        </Box>
      </Box>
      <CardPage
        onClickPage={onClickPage}
        questions={audioData}
        groupSelected={groupSelected}
        part={part}
        group={group}
        question={questionData}
        displayNumber={displayNumber}
      />
    </>
  );
};

const IeltsListeningContainer = ({ valueVolum }: any) => {
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

  return <ExamTest valueVolum={valueVolum} data={data?.data.data} />;
};

export default IeltsListeningContainer;
