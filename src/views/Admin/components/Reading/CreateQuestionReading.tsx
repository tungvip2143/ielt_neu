import { yupResolver } from "@hookform/resolvers/yup";
import BlockIcon from "@mui/icons-material/Block";
import SaveIcon from "@mui/icons-material/Save";
import { Card, FormGroup, InputAdornment, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Editor } from "@tinymce/tinymce-react";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import SelectField from "components/CustomField/SelectField";
import InputCommon from "components/Input";
import { DataAnswer, QuestionType } from "constants/questionType";
import useGetLevel from "hooks/Reading/useGetLevel";
import useGetParts from "hooks/Reading/useGetParts";
import { QuestionTypeI, ResponseParams } from "interfaces/questionInterface";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReadingService from "services/ReadingService";
import * as yup from "yup";

export interface Props {
  onClose: () => void;
}
const dataMock: any = [];
const CreateQuestionReading = (props: Props) => {
  const { onClose } = props;
  const editorRef = useRef<any>();

  const validationSchema = yup.object().shape({
    questionSimple: yup
      .string()
      .required("This field is required!")
      .min(6, "This field must be at least 6 characters")
      .max(200, "This field must not exceed 200 characters"),
    questionType: yup.mixed().required("This field is required!"),
    question: yup.string().required("This field is required!"),
    levelType: yup.string().required("This field is required!"),
    firstAnswer: yup.string().required("This field is required!"),
    secondAnswer: yup.string().required("This field is required!"),
    thirdAnswer: yup.string().required("This field is required!"),
    fourAnswer: yup.string().required("This field is required!"),
    correctAnswer: yup.string().required("This field is required!"),
  });
  const [questionType, setQuestionType] = useState<number | undefined | string>(0);
  const [dataMockQuestion, setDataMockQuestion] = useState(dataMock);

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const { control, handleSubmit, setValue, getValues } = formController;

  const [openQuestion, setOpenQuestion] = useState(false);
  const [dataPart, refetch] = useGetParts();
  const [dataLevels] = useGetLevel();

  const convertDataPart = (dataPart?.data?.data || [])?.map((el: any) => ({
    label: el.passageTitle,
    value: el.id,
  }));

  const onSubmit = async (data: ResponseParams) => {
    console.log("data", data);

    const body = {
      // answer: data.correctAnswer,
      // explanationText: ,
      // questionText: ,
      // groupId: "627a20c2854826491d0c60af",
    };
    try {
      const response = await ReadingService.postListDataReadingService(body);
    } catch (error) {
      console.log("error");
    }
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
        return DataAnswer.map((item: QuestionTypeI, index: number) => {
          return <div key={index}>{renderMultiChoice(item)}</div>;
        });
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
        <ButtonSave icon={<SaveIcon sx={{ fontSize: "20px" }} />} type="submit" />
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={onClose} />
      </Stack>
    );
  };

  const onAddQuestion = () => {
    // dataMock.push()
    const question = {
      id: dataMockQuestion.length + 1,
      question: "Question 5",
      correct: "b",
    };
    setDataMockQuestion((pre: any) => [...pre, question]);
    setOpenQuestion(true);
  };
  const onCloseAddQuestion = () => {
    //
  };

  const onSavePart = async () => {
    const body = {
      level: getValues().levelPart,
      passageTitle: getValues().partTitle,
    };

    try {
      const response = await ReadingService.postCreatePart(body);
      if (response.data.statusCode === 200) {
        alert("Create part success!");
        refetch();
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      <Card style={{ marginBottom: "15px", padding: 20 }}>
        <Typography style={{ fontWeight: "bold" }}>Create parts</Typography>
        <div style={{ display: "flex" }}>
          <InputCommon
            id="standard-basic"
            label="Passage title"
            variant="standard"
            name="partTitle"
            control={control}
            required
            fullWidth
          />
          <SelectField
            control={control}
            options={dataLevels}
            label="Level"
            variant="standard"
            name="levelPart"
            setValue={formController.setValue}
            style={{ marginLeft: 20, marginRight: 20 }}
          />
          <ButtonSave onClick={onSavePart} />
        </div>
      </Card>
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
        <div>
          <Card className="px-[20px] pb-[20px] ml-[20px] mb-3">
            <SelectField
              control={control}
              options={convertDataPart}
              label="Parts"
              name="parts"
              setValue={formController.setValue}
              style={{ marginTop: 20 }}
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
                options={dataLevels}
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
      </div>
      {renderButton()}
    </form>
  );
};

export default CreateQuestionReading;
