import LoadingPage from "components/Loading";
import { useIeltsListening } from "hooks/ielts/useIelts";
import React from "react";
import { useSelector } from "react-redux";
import CardExercise from "components/Card/CardExercise";
import CardPart from "components/Card/CardPart";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { Box } from "@mui/system";
import CardPage from "./CardPage";
import ContentQuestion from "./ContentQuestion";
type Props = {
  data: any;
};

const ExamTest = (props: Props) => {
  // !State
  const { data } = props;
  // const [questions, setQuestions] = React.useState(data || {});

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
  //

  const container = {
    width: "90%",
    maxWidth: "1440px",
    margin: "0 auto",
  };

  return (
    <>
      <Box sx={container}>
        <CardPart part={groupSelected.part + 1} />
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

const IeltsListeningContainer = () => {
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);
  const { data, isLoading } = useIeltsListening(testCode);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <ExamTest data={data} />;
};

export default IeltsListeningContainer;
