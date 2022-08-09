import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import SelectField from "components/CustomField/SelectField";
import InputCommon from "components/Input";
import ModalCreate from "components/Modal/ModalCreate";
import { DataAnswer } from "constants/questionType";
import useGetDetailQuestion from "hooks/Reading/useGetDetailQuestion";
import useGetLevels from "hooks/Reading/useGetLevel";
import useGetQuestionType from "hooks/Reading/useGetQuestionType";
import { QuestionTypeI } from "interfaces/questionInterface";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ReadingService from "services/ReadingService";

export interface Props {
  openModal: any;
  onCloseModal?: () => void;
  id: number | string;
  fetchData: any;
}

const ModalCreateQuestion = (props: Props) => {
  const { openModal, onCloseModal = () => {}, id, fetchData } = props;
  const editorRef = useRef<any>();
  const matchingRef = useRef<any>();
  const [questionType, setQuestionType] = useState<number | undefined | string>("");
  const [dataLevels] = useGetLevels();
  const [dataQuestionType] = useGetQuestionType();
  const [dataQuestionDetail, loading, error, refetchData] = useGetDetailQuestion(openModal.id);
  console.log("questionType", questionType);

  const { register, control, handleSubmit, reset, watch, setValue, getValues } = useForm<any>({
    defaultValues: {
      questions: dataQuestionDetail?.questions?.map((el: any) => ({
        answer: "",
        explanationText: "<p>Text</p>",
        questionText: el?.questionBox,
        options: el.options?.map((e: any) => [{ key: e.key, text: e.text }]),
      })) || [{ key: "a", text: "<p>Text</p>" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
    control,
    name: "questions",
  });
  const onAddQuestion = () => {
    append({ questionType: "", levelType: "" });
  };

  const resetAsyncForm = useCallback(
    async (data: any) => {
      setValue("questionBox", data.questionBox);
      setValue("questionType", data.questionType);
      setQuestionType(data.questionType);
      setValue(
        "questions",
        data?.questions.map((el: any) => ({
          questionText: el.questionText,
          answer: el.answer,
          options: el.options.map((option: any) => option.text),
        }))
      );
    },
    [reset, setQuestionType]
  );

  useEffect(() => {
    if (dataQuestionDetail?.id) {
      resetAsyncForm(dataQuestionDetail);
    }
  }, [dataQuestionDetail?.id, dataQuestionType?.length]);

  const onSubmit = async (data: any) => {
    const keys = ["A", "B", "C", "D"];
    if (openModal.type === "createQuestion") {
      const body = {
        level: "A1",
        answerList: "<p>Text</p>",
        directionText: editorRef.current.getContent(),
        image: "uploads/2022/01/01/pepe.png",
        questionTypeTips: editorRef.current.getContent(),
        questionBox: data.questionBox,
        questionType: data.questionType,
        questions: data?.questions?.map((el: any) => {
          return {
            ...el,
            options:
              data.questionType === "MULTIPLE_CHOICE_1_ANSWER"
                ? el.options?.map((e: any, index: number) => ({ key: keys[index], text: e }))
                : [],
          };
        }),

        partId: id,
      };

      try {
        const response = await ReadingService.postCreateQuestionGroupReading(body);
        if (response.data.statusCode === 200) {
          alert("Create question group success!");
          fetchData();
          onCloseModal();
        }
      } catch (error) {
        console.log("error", error, fetchData);
      }
    }
    if (openModal.type === "updateQuestion") {
      const body = {
        level: "A1",
        answerList: "<p>Text</p>",
        directionText: editorRef.current.getContent(),
        image: "uploads/2022/01/01/pepe.png",
        questionTypeTips: editorRef.current.getContent(),
        questionBox: data.questionBox,
        questionType: data.questionType,
        questions: data?.questions?.map((el: any) => {
          return {
            ...el,
            options:
              data.questionType === "MULTIPLE_CHOICE_1_ANSWER"
                ? el.options?.map((e: any, index: number) => ({ key: keys[index], text: e }))
                : [],
          };
        }),

        partId: id,
      };

      try {
        const response = await ReadingService.patchUpdateQuestionGroup(dataQuestionDetail?.id, body);
        if (response.data.statusCode === 200) {
          alert("Update question group success!");
          fetchData();
          onCloseModal();
        }
      } catch (error) {
        console.log("error", error, fetchData);
      }
    }
  };

  const onSaveModal = (e: any) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  const renderMultiChoice = (item: any, index: number, indexQuestion: number) => {
    return (
      <InputCommon
        control={control}
        id="standard-basic"
        label={item.title}
        variant="standard"
        name={`questions[${indexQuestion}].options[${index}]`}
        InputProps={{
          startAdornment: <InputAdornment position="start">{item.answer}</InputAdornment>,
        }}
        disabled={openModal.type === "detailQuestion"}
      />
    );
  };
  const renderViewAnswer = (type: number | undefined | string, index: number) => {
    switch (type) {
      case "MULTIPLE_CHOICE_1_ANSWER":
        return DataAnswer.map((item: QuestionTypeI, indexAnswer: number) => {
          return <div key={indexAnswer}>{renderMultiChoice(item, indexAnswer, index)}</div>;
        });
      case "MATCHING_HEADINGS":
        return;
      default:
        return (
          <InputCommon
            control={control}
            id="standard-basic"
            label="Correct answer"
            variant="standard"
            name={`questions[${index}].answer`}
            disabled={openModal.type === "detailQuestion"}
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
        dataQuestionDetail?.questionBox ? (
          <Typography style={{ fontWeight: "bold" }}>{dataQuestionDetail?.questionBox}</Typography>
        ) : (
          <InputCommon
            id="standard-basic"
            label="Question group"
            variant="standard"
            name="questionBox"
            control={control}
            required
            fullWidth
          />
        )
      }
    >
      <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
        <Editor
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={dataQuestionDetail ? dataQuestionDetail?.directionText : "<p>Question tip.</p>"}
          init={{
            height: 200,
            plugins: "link image code",
            toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
          }}
          disabled={openModal.type === "detailQuestion"}
        />
        <SelectField
          control={control}
          options={dataQuestionType}
          label="Type Of Question"
          name="questionType"
          setValue={setValue}
          onChangeExtra={(e: any) => {
            setValue("questionType", e?.value);
            setQuestionType(e?.value);
          }}
          style={{ marginTop: 20 }}
          disabled={openModal.type === "detailQuestion"}
        />
        {(openModal.type !== "detailQuestion" || questionType === "MATCHING_HEADINGS") && (
          <div className="text-end mb-2">
            <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab mt-[20px]" onClick={onAddQuestion} />
          </div>
        )}
        {questionType === "MATCHING_HEADINGS" ? (
          <Editor
            onInit={(evt, matching) => {
              matchingRef.current = matching;
            }}
            initialValue="Matching heading"
            init={{
              height: 200,
              plugins: "link image code",
              toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
            }}
            disabled={openModal.type === "detailQuestion"}
          />
        ) : (
          <>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex items-center">
                  <div style={{ border: "1px solid #bcbcbc", marginTop: 10, padding: 20, borderRadius: 6, flex: 1 }}>
                    <div className="questionContainer">
                      <InputCommon
                        id="standard-basic"
                        label="Question"
                        variant="standard"
                        name={`questions[${index}].questionText`}
                        control={control}
                        required
                        fullWidth
                        disabled={openModal.type === "detailQuestion"}
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
                      <div className="grid grid-cols-2 gap-4">{renderViewAnswer(questionType, index)}</div>
                      {questionType === "MULTIPLE_CHOICE_1_ANSWER" && (
                        <InputCommon
                          control={control}
                          id="standard-basic"
                          label="Correct answer"
                          variant="standard"
                          name={`questions[${index}].answer`}
                          disabled={openModal.type === "detailQuestion"}
                        />
                      )}
                    </Box>
                  </div>
                  {fields.length > 1 && openModal.type !== "detailQuestion" && (
                    <RemoveCircleOutlineIcon
                      className="text-[#F44335] cursor-grab ml-[20px]"
                      onClick={() => onRemoveQuestion(index)}
                    />
                  )}
                </div>
              );
            })}
          </>
        )}

        {renderButton()}
      </form>
    </ModalCreate>
  );
};

export default ModalCreateQuestion;
