import { makeStyles, Typography } from "@mui/material";
import "./styles.scss";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { AUDIO_URL } from "constants/constants";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import QuestionBox from "components/Ielts/components/QuestionBox";
import MatchingType from "components/Ielts/components/MachingType";
import MachingHeading from "components/Ielts/components/MachingHeading";
import FlowChart from "components/Ielts/components/FlowChart";
import SentenceCompletetion from "components/Ielts/components/SentenceCompletetion";
import IdentifyInformationType from "components/Ielts/components/IdentifyInformationType";
import ReactHtmlParser from "react-html-parser";
import { Form, Formik } from "formik";
import MultiChoice from "views/Ielts/listening/components/CardRender/MultiChoice";

export interface Props {
  dataReading?: [];
}

const Reading = (props: Props) => {
  const { dataReading } = props;
  const renderQuestion = (group: any) => {
    const { questionType } = group;
    if (questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS) {
      return (
        <MatchingType
          //   onHightLightNumberPage={onHightLightNumberPage}
          answerList={group?.answerList}
          questionBox={group?.questionBox}
          data={group?.questions}
          isView={true}
          // onClickPage={onClickPage}
          displayNumber={1}
        />
      );
    }
    if (questionType === QUESTION_TYPE.SUMMARY_COMPLETION) {
      return (
        <QuestionBox
          // onClickPage={onClickPage}
          displayNumber={1}
          questions={group?.questions}
          questionBox={group?.questionBox}
        />
      );
    }
    if (questionType === QUESTION_TYPE.NOTE_COMPLETION) {
      return (
        <QuestionBox
          onClickPage={() => { }}
          displayNumber={1}
          questions={group?.questions}
          questionBox={group?.questionBox}
        />
      );
    }
    if (questionType === QUESTION_TYPE.MATCHING_HEADINGS) {

      return (
        group?.questions?.map((el: any) => {
          return (
            <MachingHeading
              onHightLightNumberPage={() => null}
              question={group?.questions}
              answerList={group?.answerList}
              data={el}
              onClickPage={() => { }}
              displayNumber={1}
            />
          )
        })

      );
    }
    if (questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION || questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM) {
      return <FlowChart onClickPage={() => null} question={group.questions} image={group?.image} displayNumber={1} />;
    }
    if (questionType === QUESTION_TYPE.SENTENCE_COMPLETION) {
      return group?.questions.map((question: any) => {
        return <SentenceCompletetion data={question} />;

      })
    }
    if (
      questionType === QUESTION_TYPE.IDENTIFYING_INFORMATION ||
      questionType === QUESTION_TYPE.MULTIPLE_CHOICE_1_ANSWER ||
      questionType === QUESTION_TYPE.IDENTIFYING_VIEWS_CLAIMS
    ) {
      return (
        <MultiChoice onClickPage={() => null} dataQuestions={group?.questions} audio={null} />
      );
    }
  };

  return (
    <Formik initialValues={{}} onSubmit={() => console.log("hello")}>
      {(formik: any) => (
        <Form>
          <div>
            {dataReading?.map((el: any) => {
              return (
                <div className="listening">
                  <div className="listeningWrapper">
                    <Typography className="titlePart">
                      Part {el?.partNumber}: {el?.partTitle}
                    </Typography>
                  </div>
                  <div className="listeningWrapper" style={{ marginLeft: "20px" }}>
                    {el?.groups?.map((group: any) => {
                      return (
                        <div>
                          <Typography className="titlePart">{group?.questionBox}</Typography>
                          {renderQuestion(group)}
                          {/* {group?.questions?.map((question: any) => {
                      return <Typography className="titlePart">{question?.questionText}</Typography>;
                    })} */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Reading;
