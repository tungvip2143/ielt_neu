import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, InputAdornment } from "@mui/material";
import InputField from "components/CustomField/InputField";
import { DataAnswer } from "constants/questionType";
import { FastField } from "formik";
import { QuestionTypeI } from "interfaces/questionInterface";

export interface Props {
  questions: any[];
}

const MultiChoiceType = (props: Props) => {
  //!State
  const { questions } = props;

  //!Function
  const onRemoveQuestion = (index: number) => {
    // remove(index);
  };

  //!Render

  const renderViewAnswer = (indexQuestion: number) => {
    return DataAnswer.map((item: QuestionTypeI, indexAnswer: number) => {
      return (
        <div key={indexAnswer}>
          <FastField
            component={InputField}
            name={`questions[${indexQuestion}].options[${indexAnswer}]`}
            label={item?.title}
            InputProps={{
              startAdornment: <InputAdornment position="start">{item.answer}</InputAdornment>,
            }}
          />
        </div>
      );
    });
  };

  return (
    <div>
      {questions.map((field, index) => {
        return (
          <div key={field.id} className="flex items-center">
            <div style={{ border: "1px solid #bcbcbc", marginTop: 10, padding: 20, borderRadius: 6, flex: 1 }}>
              <div className="questionContainer">
                <FastField component={InputField} name={`questions[${index}].questionText`} label="Question" />
              </div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "25ch", marginRight: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="grid grid-cols-2 gap-4">{renderViewAnswer(index)}</div>
                <FastField component={InputField} name={`questions[${index}].answer`} label="Correct answer" />
              </Box>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultiChoiceType;
