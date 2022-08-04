import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, FormGroup, InputAdornment, Stack } from "@mui/material";
import { Box } from "@mui/system";
import SelectField from "components/CustomField/SelectField";
import InputCommon from "components/Input";
import { DataAnswer, LevelType, QuestionType } from "constants/questionType";
import { QuestionTypeI, ResponseParams } from "interfaces/questionInterface";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface Props {
  onClose: () => void;
}
const CreateQuestionSpeaking = (props: Props) => {
  const { onClose } = props;
  const validationSchema = yup.object().shape({});
  const [questionType, setQuestionType] = useState<number | undefined | string>(1);

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const { control, handleSubmit, setValue, getValues } = formController;
  const onSubmit = (data: any) => {};

  const renderMultiChoice = (item: any) => {
    return (
      <InputCommon
        control={control}
        id="standard-basic"
        label={item.title}
        variant="standard"
        name={item.name}
        InputProps={{
          startAdornment: <InputAdornment position="start">{item.answer}</InputAdornment>,
        }}
      />
    );
  };

  const renderViewAnswer = (type: number | undefined | string) => {
    switch (type) {
      case 1:
        return DataAnswer.map((item: QuestionTypeI) => renderMultiChoice(item));
      case 3:
        return DataAnswer.map((item: QuestionTypeI) => renderMultiChoice(item));
      default:
        return (
          <InputCommon
            control={control}
            id="standard-basic"
            label="Correct answer"
            variant="standard"
            name="questionSimple"
          />
        );
        break;
    }
  };
  const renderButton = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-center mt-[40px]">
        <Button variant="contained">Save</Button>
        <Button variant="contained" style={{ background: "#f44336" }} onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      <Card sx={{ minWidth: 275 }} className="p-[20px]">
        <FormGroup>
          <SelectField
            control={control}
            options={QuestionType}
            label="Type Of Question"
            name="questionType"
            setValue={formController.setValue}
            onChangeExtra={(e) => {
              setValue("questionType", e?.value);
              setQuestionType(e?.value);
            }}
          />
        </FormGroup>
        <div className="questionContainer">
          <InputCommon
            id="standard-basic"
            label="Question"
            variant="standard"
            name="question"
            control={control}
            required
            fullWidth
          />
          <SelectField
            control={control}
            options={LevelType}
            label="Level"
            variant="standard"
            style={{ marginLeft: 20 }}
            name="levelType"
            setValue={formController.setValue}
          />
        </div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "25ch", marginRight: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="answerContainer">{renderViewAnswer(questionType)}</div>
          {(questionType === 1 || questionType === 3) && (
            <InputCommon
              control={control}
              id="standard-basic"
              label="Correct answer"
              variant="standard"
              name="correctAnswer"
            />
          )}
        </Box>
        {renderButton()}
      </Card>
    </form>
  );
};

export default CreateQuestionSpeaking;
