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

export interface Props {
  dataReading?: [];
}

const Reading = (props: Props) => {
  const { dataReading } = props;
  const renderQuestion = (group: any) => {
    const { questionType } = group;
    if (questionType === QUESTION_TYPE.MATCHING_SENTENCE_ENDINGS) {
      return (
        // <div>
        //   <div>
        //     {group?.questions?.map((question: any, questionIndex: number) => {
        //       const index = Number(question?.question?.displayNumber) - 1;
        //       return (
        //         <div key={question._id} onClick={() => {}}>
        //           {/* <div>
        //             <strong>{`${question?.displayNumber}.`}</strong>
        //           </div> */}
        //           {ReactHtmlParser(question?.questionText)}
        //           {/* <FastField
        //             inputRef={(el: any) => (inputRef.current[index + 1] = el)}
        //             onFocus={() => handleFocus(index)}
        //             component={TextField}
        //             name={`answers[${index}].studentAnswer`}
        //             size="small"
        //           /> */}
        //         </div>
        //       );
        //     })}
        //   </div>
        //   <div>{ReactHtmlParser(group?.answerList)}</div>
        // </div>
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
    // if (questionType === QUESTION_TYPE.SUMMARY_COMPLETION) {
    //   return (
    //     <QuestionBox
    //       // onClickPage={onClickPage}
    //       displayNumber={1}
    //       questions={group}
    //       questionBox={group?.questionBox}
    //     />
    //   );
    // }
    // if (questionType === QUESTION_TYPE.NOTE_COMPLETION) {
    //   return (
    //     <QuestionBox
    //       onClickPage={onClickPage}
    //       displayNumber={displayNumber}
    //       questions={data}
    //       questionBox={questionBox}
    //     />
    //   );
    // }
    // if (questionType === QUESTION_TYPE.MATCHING_HEADINGS) {
    //   return (
    //     <MachingHeading
    //       onHightLightNumberPage={onHightLightNumberPage}
    //       question={question}
    //       answerList={answerList}
    //       data={data}
    //       onClickPage={onClickPage}
    //       displayNumber={displayNumber}
    //     />
    //   );
    // }
    // if (questionType === QUESTION_TYPE.FLOW_CHART_COMPLETION || questionType === QUESTION_TYPE.LABELLING_A_DIAGRAM) {
    //   return <FlowChart onClickPage={onClickPage} question={question} image={image} displayNumber={displayNumber} />;
    // }
    // if (questionType === QUESTION_TYPE.SENTENCE_COMPLETION) {
    //   return <SentenceCompletetion data={data} />;
    // }
    // if (
    //   questionType === QUESTION_TYPE.IDENTIFYING_INFORMATION ||
    //   questionType === QUESTION_TYPE.MULTIPLE_CHOICE_1_ANSWER ||
    //   questionType === QUESTION_TYPE.IDENTIFYING_VIEWS_CLAIMS
    // ) {
    //   return (
    //     <IdentifyInformationType
    //       questionType={questionType}
    //       QUESTION_TYPE={QUESTION_TYPE}
    //       question={question}
    //       expanded={expanded}
    //       onCollapse={onCollapse}
    //       onHightLightNumberPage={onHightLightNumberPage}
    //       displayNumber={displayNumber}
    //       questionIdx={questionIdx}
    //       onClickPage={onClickPage}
    //     />
    //   );
    // }
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
