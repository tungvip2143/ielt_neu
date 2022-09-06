import LoadingPage from "components/Loading";
import { useIeltsListening } from "hooks/ielts/useIelts";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardExercise from "components/Card/CardExercise";
import CardPart from "components/Card/CardPart";
import { isEmpty, random } from "lodash";
import { useMemo } from "react";
import { Box } from "@mui/system";
import CardPage from "./CardPage";
import ContentQuestion from "./ContentQuestion";
import ReactAudioPlayer from "react-audio-player";
import { ROOT_ORIGINAL_URL } from "constants/api";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import { useHistory } from "react-router-dom";
import { useFormikContext } from "formik";
import cacheService from "services/cacheService";
import { useQuery } from "react-query";
import ieltsService from "services/ieltsService";
import { showError } from "helpers/toast";
import { getErrorMsg } from "helpers";
import useSagaCreators from "hooks/useSagaCreators";
import { authActions } from "redux/creators/modules/auth";
import { RouteBase } from "constants/routeUrl";

type Props = {
  data: any;
};

const ExamTest = (props: Props) => {
  //! State
  const { data } = props;
  const audioData = data || [];
  const dataCache = cacheService.getDataCache();
  const { idxAudioPlaying: initialAudioIndxPlaying } = dataCache;
  const audioInitialIndex = initialAudioIndxPlaying ? initialAudioIndxPlaying : 0;
  const [idxAudioPlaying, setIdxAudioPlaying] = React.useState(0);
  const { values } = useFormikContext();

  const [groupSelected, setGroupSelected] = React.useState({
    part: 0,
    group: 0,
    question: 0,
  });
  const [showQuestion, setShowQuestion] = useState("1");
  const [questionType, setQuestionType] = useState();

  const part = data;
  const group = audioData[groupSelected.part]?.groups;

  const questionData = audioData[groupSelected.part]?.groups[groupSelected.group]?.questions || [];
  const displayNumber = questionData[groupSelected.question]?.question?.displayNumber;

  useEffect(() => {
    cacheService.cache("answers", values);
    cacheService.cache("idxAudioPlaying", idxAudioPlaying);
  }, [values, idxAudioPlaying]);

  const onClickPage = (groupRenderSelected: any) => {
    setGroupSelected({ ...groupSelected, ...groupRenderSelected });
  };
  const onClickShowQuestion = (displayNumber: any) => {
    setShowQuestion(displayNumber);
  };
  const onClickQuestionType = (questionType: any) => {
    setQuestionType(questionType);
  };

  const partRenderSelected = useMemo(() => {
    // const questionsWithPageNumberTemp = data as any;
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
        <CardPart content={questionType} />
        <div>
          <ReactAudioPlayer
            src={`${ROOT_ORIGINAL_URL}/${audioData[idxAudioPlaying]?.partAudio}`}
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
  const { dispatch } = useSagaCreators();

  const testCode = useMemo(() => {
    return localStorage.getItem("testCode");
  }, []);

  const history = useHistory();
  const { data, isLoading, isError } = useQuery(
    "get ielts listening data",
    () => ieltsService.getIeltsListening(testCode),
    {
      onSuccess: () => {
        cacheService.cache("skill", "LISTENING");
      },
      onError: (error) => {
        history.push(RouteBase.Login);
        localStorage.removeItem("testCode");
        localStorage.removeItem("examinationId");
        cacheService.clearCacheData();
        setTimeout(() => {
          showError(getErrorMsg(error));
        }, 5000);
        dispatch(authActions.logout);
      },
    }
  );

  if (isLoading) {
    return <LoadingPage />;
  }
  // if (isError) {
  //   history.push("/login");
  // }

  return <ExamTest data={data?.data.data} />;
};

export default IeltsListeningContainer;
