import { Box } from "@mui/system";
import CardExercise from "components/Card/CardExercise";
import CardPart from "components/Card/CardPart";
import LoadingPage from "components/Loading";
import { ROOT_ORIGINAL_URL } from "constants/api";
import { RouteBase } from "constants/routeUrl";
import { useFormikContext } from "formik";
import { getErrorMsg } from "helpers";
import { showError } from "helpers/toast";
import useSagaCreators from "hooks/useSagaCreators";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { authActions } from "redux/creators/modules/auth";
import cacheService from "services/cacheService";
import ieltsService from "services/ieltsService";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import CardPage from "./CardPage";
import ContentQuestion from "./ContentQuestion";

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

  console.log("formik value", values);
  const [groupSelected, setGroupSelected] = React.useState({
    part: 0,
    group: 0,
    question: 0,
  });
  const [showQuestion, setShowQuestion] = useState("1");
  const [questionType, setQuestionType] = useState();
  const [changeValueVolum, setChangeValueVolum] = useState<any>(0.5);

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

  const handleChangeValueVolum = (value: any) => {
    if (value === 100) {
      return setChangeValueVolum(1);
    }
    setChangeValueVolum(Number(`0.${value}`));
  };

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
            volume={changeValueVolum}
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
        handleChangeValueVolum={handleChangeValueVolum}
      />

      {/* <CardPage questions={audioData} onClickPage={onClickPage} /> */}
    </>
  );
};

const IeltsListeningContainer = () => {
  const { dispatch } = useSagaCreators();
  const history = useHistory();

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
        // history.push(RouteBase.Login);
        dispatch(authActions.logout);
      }, 1000);
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return <ExamTest data={data?.data.data} />;
};

export default IeltsListeningContainer;
