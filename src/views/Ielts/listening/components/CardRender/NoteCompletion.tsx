import React, { useEffect, useMemo } from "react";
import Handlebars from "handlebars";
import { useFormikContext } from "formik";
import Timer from "helpers/timer";
import { PartContentQuestionsI, QuestionItemI, FormikI } from "../../../../../constants/typeData.types";
interface NoteCompletionDadI {
  groupData: PartContentQuestionsI;
}
interface NoteCompletionI extends NoteCompletionDadI {
  displayNumber: number;
  onClickPage: (options: object) => void;
  questionBox: string;
}

const CODE = "-@X$";

const convertBlankIdToQuestionId = (questionBox = "", blankId: number, questionId: number) => {
  questionBox = questionBox.replace(`{{blank ${blankId}}}`, `{{blank ${questionId}${CODE}}}`);
  return questionBox;
};

const NoteCompletion = (props: NoteCompletionI) => {
  //! State
  const inputDebounce = React.useRef(new Timer());
  const queueAnswers = React.useRef<object>({});
  const { questionBox, groupData, displayNumber, onClickPage } = props;
  // console.log("fsd242343", groupData);

  const { setFieldValue, values }: FormikI = useFormikContext();

  const newQuestionBoxParsed = useMemo(() => {
    let tempQuestionBox: string = questionBox ?? "";
    groupData.questions.forEach((el: QuestionItemI) => {
      // console.log("332423", el);
      const { blankNumber, displayNumber } = el.question;
      setFieldValue(`answers[${displayNumber - 1}].questionId`, el.questionId);
      tempQuestionBox = convertBlankIdToQuestionId(tempQuestionBox, Number(blankNumber), Number(displayNumber));
    });

    // console.log("newQuestionBoxParsed", newQuestionBoxParsed);

    tempQuestionBox = tempQuestionBox.replaceAll(CODE, "");
    return tempQuestionBox;
  }, [groupData, questionBox]);

  useEffect(() => {
    const input: Element | any = document.querySelector(`[id=input-${displayNumber}]`);
    if (input) {
      input?.focus();
    }
  }, [displayNumber]);

  const questionBoxHTML: any = Handlebars.compile(newQuestionBoxParsed || "");

  let inputIndex = 0;
  Handlebars.registerHelper("blank", function (blankId: number) {
    // console.log("blankId", blankId);
    inputIndex++;
    const input: Element | any = document.querySelector(`[id=input-${blankId}]`);
    if (input) {
      input.value = values.answers[blankId - 1]?.studentAnswer;
    }
    return new Handlebars.SafeString(
      `
      <strong>${blankId}</strong>
      <input
          key="input-${blankId}"
          name="answers[${blankId - 1}].studentAnswer"
          id="input-${blankId}"
          type="text"
          class='${inputIndex} noselect'
        />
      `
    );
  });

  //! Function
  const onChangeInputHandleBars = (e: Event | any) => {
    queueAnswers.current = {
      ...queueAnswers.current,
      [e.target.name]: e.target.value,
    };

    inputDebounce.current.debounce(() => {
      Object.entries(queueAnswers.current).forEach(([question, value]) => {
        setFieldValue(question, value);
      });
    }, 0);
  };

  const onClickInput = (data: Event | any) => {
    const inputIdx: number = data.target.getAttribute("class") - 1;
    onClickPage && onClickPage({ question: inputIdx });
  };
  const onFocusInput = (event: Event | any) => {
    const inputIdx: number = event.target.getAttribute("class") - 1;
    onClickPage && onClickPage({ question: inputIdx });
  };

  //! Render
  return (
    <>
      <div
        // onClick={(data) => onClickInput(data)}
        onFocus={(event) => onClickInput(event)}
        dangerouslySetInnerHTML={{ __html: questionBoxHTML() }}
        onInput={onChangeInputHandleBars}
      />
    </>
  );
};

export default NoteCompletion;
