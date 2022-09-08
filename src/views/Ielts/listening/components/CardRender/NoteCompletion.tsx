import React, { useEffect, useMemo } from "react";
import Handlebars from "handlebars";
import { useFormikContext } from "formik";
import Timer from "helpers/timer";

type Props = {
  questionBox?: any;
  groupData?: any;
  displayNumber: number;
  onClickPage: (options: any) => void;
};

const CODE = "-@X$";

const convertBlankIdToQuestionId = (questionBox = "", blankId: number, questionId: number) => {
  questionBox = questionBox.replace(`{{blank ${blankId}}}`, `{{blank ${questionId}${CODE}}}`);
  return questionBox;
};

const NoteCompletion = (props: Props) => {
  //! State
  const inputDebounce = React.useRef(new Timer());
  const queueAnswers = React.useRef<any>({});
  const { questionBox, groupData, displayNumber, onClickPage } = props;
  const { setFieldValue, values }: any = useFormikContext();

  console.log("questionBox", questionBox);

  const newQuestionBoxParsed = useMemo(() => {
    let tempQuestionBox = questionBox;
    groupData.questions.forEach((el: any) => {
      const { blankNumber, displayNumberT } = el.question;
      setFieldValue(`answers[${displayNumber - 1}].questionId`, el.questionId);
      tempQuestionBox = convertBlankIdToQuestionId(tempQuestionBox, Number(blankNumber), Number(displayNumber));
    });

    tempQuestionBox = tempQuestionBox.replaceAll(CODE, "");
    return tempQuestionBox;
  }, [groupData, questionBox]);

  useEffect(() => {
    const input = document.querySelector(`[id=input-${displayNumber}]`) as any;
    if (input) {
      input?.focus();
    }
  }, [displayNumber]);

  const questionBoxHTML: any = Handlebars.compile(newQuestionBoxParsed);

  let inputIndex = 0;
  Handlebars.registerHelper("blank", function (blankId: any) {
    console.log("blankId", blankId);
    inputIndex++;
    const input: any = document.querySelector(`[id=input-${blankId}]`);
    if (input) {
      input.value = values.answers[blankId - 1]?.studentAnswer;
    }
    return new Handlebars.SafeString(
      `
      ${blankId}
      <input
          key="input-${blankId}"
          name="answers[${blankId - 1}].studentAnswer"
          id="input-${blankId}"
          type="text"
          class='${inputIndex}'
        />
      `
    );
  });

  //! Function
  const onChangeInputHandleBars = (e: any) => {
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

  const onClickInput = (data: any) => {
    const inputIdx: any = data.target.getAttribute("class") - 1;
    onClickPage && onClickPage({ question: inputIdx });
  };

  //! Render
  return (
    <div
      onClick={(data) => onClickInput(data)}
      dangerouslySetInnerHTML={{ __html: questionBoxHTML() }}
      onInput={onChangeInputHandleBars}
    />
  );
};

export default NoteCompletion;
