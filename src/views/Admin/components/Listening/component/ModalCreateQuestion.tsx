import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, InputAdornment, Stack, Typography } from "@mui/material";
import SelectField from "components/CustomField/SelectField";
import InputCommon from "components/Input";
import ModalCreate from "components/Modal/ModalCreate";
import { DataAnswer } from "constants/questionType";
import useGetLevels from "hooks/Reading/useGetLevel";
import useGetQuestionType from "hooks/Reading/useGetQuestionType";
import { QuestionTypeI, ResponseParams } from "interfaces/questionInterface";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Editor } from "@tinymce/tinymce-react";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import BlockIcon from "@mui/icons-material/Block";
import SaveIcon from "@mui/icons-material/Save";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ReadingService from "services/ReadingService";

export interface Props {
  openModal: boolean;
  onCloseModal?: () => void;
  id: number | string;
}

const ModalCreateQuestion = (props: Props) => {
  const { openModal, onCloseModal = () => {}, id } = props;
  const editorRef = useRef<any>();
  const [questionType, setQuestionType] = useState<number | undefined | string>(0);
  const [dataLevels] = useGetLevels();
  const [dataQuestionType] = useGetQuestionType();

  const { register, control, handleSubmit, reset, watch, setValue } = useForm<any>({
    defaultValues: {
      questionReading: [{ key: "a", text: "<p>Text</p>" }],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
    control,
    name: "questionReading",
  });
  const onAddQuestion = () => {
    append({ questionType: "", levelType: "" });
  };

  const onSubmit = async (data: any) => {
    console.log("data", data);

    const body = {
      level: "A1",
      answerList: "<p>Text</p>",
      directionText: "<p>Text</p>",
      image: "uploads/2022/01/01/pepe.png",
      questionTypeTips: editorRef.current.getContent(),
      questionBox: data.questionText,
      questionType: data.questionType,
      questions: [
        {
          answer: data.correctAnswer,
          explanationText: "<p>Text</p>",
          questionText: data.question,
          options: [
            {
              // key: DataAnswer[index].answer,
              text: "<p>Text</p>",
            },
          ],
        },
      ],
      partId: id,
    };
    console.log("body", body);

    try {
      const response = await ReadingService.postCreateQuestionGroupReading(body);
      if (response.data.statusCode === 200) {
        alert("Create question group success!");
        onCloseModal();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const onSaveModal = (e: any) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
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
      case "MULTIPLE_CHOICE_1_ANSWER":
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
    }
  };
  const renderButton = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-center mt-[40px]">
        <ButtonSave icon={<SaveIcon sx={{ fontSize: "20px" }} />} onClick={onSaveModal} />
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={onCloseModal} />
      </Stack>
    );
  };

  const onRemoveQuestion = (index: number) => {
    remove(index);
  };

  return (
    <ModalCreate
      open={openModal}
      onClose={onCloseModal}
      titleModal={
        <InputCommon
          id="standard-basic"
          label="Question title"
          variant="standard"
          name="questionText"
          control={control}
          required
          fullWidth
        />
      }
    >
      <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
        <Editor
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue="<p>Question tip.</p>"
          init={{
            height: 200,
            plugins: "link image code",
            toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
          }}
        />
        <SelectField
          control={control}
          options={dataQuestionType}
          label="Type Of Question"
          name="questionType"
          setValue={setValue}
          onChangeExtra={(e) => {
            setValue("questionType", e?.value);
            setQuestionType(e?.value);
          }}
          style={{ marginTop: 20 }}
        />
        <div className="text-end mb-2">
          <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab mt-[20px]" onClick={onAddQuestion} />
        </div>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex items-center">
              <div style={{ border: "1px solid #bcbcbc", marginTop: 10, padding: 20, borderRadius: 6, flex: 1 }}>
                <div className="questionContainer">
                  <InputCommon
                    id="standard-basic"
                    label="Question"
                    variant="standard"
                    name={`questionReading[${index}].question`}
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
                    name={`questionReading[${index}].levelType`}
                    setValue={setValue}
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
                      name={`questionReading[${index}].correctAnswer`}
                    />
                  )}
                </Box>
              </div>
              {fields.length > 1 && (
                <RemoveCircleOutlineIcon
                  className="text-[#F44335] cursor-grab ml-[20px]"
                  onClick={() => onRemoveQuestion(index)}
                />
              )}
            </div>
          );
        })}
        {renderButton()}
      </form>
    </ModalCreate>
  );
};

export default ModalCreateQuestion;
