import React from "react";
import Handlebars from "handlebars";
import { useFormikContext } from "formik";
import Timer from "helpers/timer";

type Props = {
  questionBox?: any;
};

const NoteCompletion = (props: Props) => {
  //! State
  const inputDebounce = React.useRef(new Timer());
  const queueAnswers = React.useRef<any>({});
  const { questionBox } = props;
  const { setFieldValue }: any = useFormikContext();

  const questionBoxHTML: any = Handlebars.compile(questionBox);

  Handlebars.registerHelper("blank", function (blankId: any) {
    return new Handlebars.SafeString(
      `
      <input
          key="input-${blankId}"
          name="answers[${blankId}].studentAnswer"
          id="input-${blankId}"
          type="text"
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

  //! Render
  return <div dangerouslySetInnerHTML={{ __html: questionBoxHTML() }} onInput={onChangeInputHandleBars} />;
};

export default NoteCompletion;
