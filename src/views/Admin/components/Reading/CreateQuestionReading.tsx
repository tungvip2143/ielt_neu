import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, FormGroup, InputAdornment, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Editor } from "@tinymce/tinymce-react";
import SelectField from "components/CustomField/SelectField";
import InputCommon from "components/Input";
import { DataAnswer, LevelType, QuestionType } from "constants/questionType";
import { QuestionTypeI, ResponseParams } from "interfaces/questionInterface";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ReadingService from "services/ReadingService";

export interface Props {
  onClose: () => void;
}
const dataMock: any = []
const CreateQuestionReading = (props: Props) => {
  const { onClose } = props;
  const editorRef = useRef<any>();

  const validationSchema = yup.object().shape({
    questionSimple: yup.string()
      .required('This field is required!')
      .min(6, 'This field must be at least 6 characters')
      .max(200, 'This field must not exceed 200 characters'),
    questionType: yup.object().required('This field is required!'),
    question: yup.string().required('This field is required!'),
    levelType: yup.string().required('This field is required!'),
    firstAnswer: yup.string().required('This field is required!'),
    secondAnswer: yup.string().required('This field is required!'),
    thirdAnswer: yup.string().required('This field is required!'),
    fourAnswer: yup.string().required('This field is required!'),
    correctAnswer: yup.string().required('This field is required!'),
  })
  const [questionType, setQuestionType] = useState<number | undefined | string>(0);
  const [dataMockQuestion, setDataMockQuestion] = useState(dataMock)

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const { control, handleSubmit, setValue, getValues } = formController;

  const [openQuestion, setOpenQuestion] = useState(false)
  const onSubmit = async (data: any) => {
    // try {
    //   const response = await ReadingService.postListDataReadingService({

    //   })
    // } catch (error) {
    //   console.log("error");

    // }
  };

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
        return DataAnswer.map((item: QuestionTypeI, index: number) => {
          return <div key={index}>{renderMultiChoice(item)}</div>;
        });
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
        <Button variant="contained" type="submit" >Save</Button>
        <Button variant="contained" style={{ background: "#f44336" }} onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    );
  };

  const onAddQuestion = () => {
    // dataMock.push()
    const question = {
      id: dataMockQuestion.length + 1,
      question: 'Question 5',
      correct: 'b'
    }
    setDataMockQuestion((pre: any) => [...pre, question])
    setOpenQuestion(true)
  }
  const onCloseAddQuestion = () => {
    //
  }


  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      <div className="flex">
        <Card sx={{ minWidth: 275 }} className="p-[20px] mb-[20px] flex-1">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              plugins: "link image code",
              toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
            }}
          />
        </Card>
        <Card sx={{ minWidth: 275 }} className="p-[20px] min-h-[250px] flex-1 ml-[20px]">
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
            <div className="grid grid-cols-2 gap-4">{renderViewAnswer(questionType)}</div>
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
        </Card>
      </div>
      {renderButton()}
    </form>
  );
};

export default CreateQuestionReading;