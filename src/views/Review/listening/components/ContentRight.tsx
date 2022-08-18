import React from "react";
import NoteCompletion from "./NoteCompletion";
import { QUESTION_TYPE } from "interfaces/ieltsQuestionType";
import SentenceCompletetion from "../../../../components/Ielts/components/SentenceCompletetion";
import MultiChoice from "./MultiChoice";
import Sign from "../../reading/components/Sign";
import FlowChart from "./FlowChart";
//
interface Props {
  partRenderSelected?: any;
  displayNumber?: any;
}
const ContentRight = ({ partRenderSelected, displayNumber }: Props) => {
  const questionType = partRenderSelected?.questionType;
  console.log("questionTypeListening", questionType);
  console.log("dataListening", partRenderSelected);
  // console.log("dataListeningImage", partRenderSelected.image);

  // console.log("displayNumber", displayNumber);

  const renderPartValueGroup = (partRenderSelected: any, displayNumber: any) => {
    console.log("displayNumber", displayNumber);

    if (questionType === QUESTION_TYPE.NOTE_COMPLETION) {
      return <NoteCompletion questionBox={partRenderSelected?.questionBox} />;
    }
    if (questionType === QUESTION_TYPE.SENTENCE_COMPLETION) {
      return <SentenceCompletetion data={partRenderSelected} />;
    }
    if (questionType === QUESTION_TYPE.LABELLING_A_PLAN_MAP) {
      return <FlowChart image={partRenderSelected?.image} question={partRenderSelected?.questions} />;
    }
    if (questionType === QUESTION_TYPE.MULTIPLE_CHOICE_1_ANSWER) {
      return (
        <>
          {partRenderSelected?.questions?.map((item: any) => {
            console.log("item", item);
            console.log("itemDispaly", item.question.displayNumber);
            const check = item.question.displayNumber === displayNumber;
            console.log("check", check);
            return (
              <>
                <MultiChoice dataQuestions={item} />
              </>
            );
          })}
        </>
      );
    }
  };
  return (
    <>
      <Sign />
      <div>{renderPartValueGroup(partRenderSelected, displayNumber)}</div>
    </>
  );
};

export default ContentRight;
// question={partRenderSelected?.questions} image={partRenderSelected?.image}
