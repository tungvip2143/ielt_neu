import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonStyles from "components/CommonStyles";
import SelectField from "components/CustomField/SelectField";
import InputCommon from "components/Input";
import ModalCreate from "components/Modal/ModalCreate";
import TinyMceCommon from "components/TinyMceCommon";
import { IMAGE_URL } from "constants/constants";
import { DataAnswer } from "constants/questionType";
import useGetDetailQuestion from "hooks/QuestionBank/Reading/useGetDetailQuestion";
import useGetQuestionType from "hooks/QuestionBank/Reading/useGetQuestionType";
import { QuestionTypeI } from "interfaces/questionInterface";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import audioService from "services/audioService";
import ReadingService from "services/ReadingService";
import * as yup from "yup";

export interface Props {
  openModal: any;
  onCloseModal?: () => void;
  id: number | string;
  fetchData: any;
}

const validationSchema = yup.object().shape({
  // questionBox: yup.string().required("This is field required"),
  questionType: yup.mixed().required("This is field required"),
  // questions: yup.array(
  //   yup.object({
  //     questionText: yup.string().required("This is field required"),
  //     answer: yup.string().required("This is field required"),
  //     options: yup.array(yup.string().required("mmm")),
  //   })
  // ),
});

const ModalCreateQuestion = (props: Props) => {
  const { openModal, onCloseModal = () => {}, id, fetchData } = props;
  const directionRef = useRef<any>();
  const editorRef = useRef<any>();
  const matchingRef = useRef<any>();
  const fileRef = useRef<any>();
  const [questionType, setQuestionType] = useState<string>("");
  const [dataQuestionType] = useGetQuestionType();
  const [dataQuestionDetail, loading, error, refetchData] = useGetDetailQuestion(openModal.id);
  const [selectFile, setSelectFile] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>();
  const { register, control, handleSubmit, reset, watch, setValue, getValues } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      section: "",
      questions: dataQuestionDetail?.questions?.map((el: any) => ({
        answer: "",
        explanationText: "",
        questionText: el?.questionBox,
        blankNumber: el?.blankNumber,
        options: el.options?.map((e: any) => [{ key: e.key, text: e.text }]),
      })) || [{ key: "a", text: "<p>Text</p>" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
    control,
    name: "questions",
  });
  const onAddQuestion = () => {
    append({ section: "" });
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
          blankNumber: el.blankNumber,
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
  const handleClick = () => {
    fileRef.current.click();
  };

  const onFileChange = async (event: any) => {
    setIsLoading(true);
    if (event.target && event.target.files[0]) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      setSelectFile(event.target.files[0]);
      try {
        const responseImage = await audioService.postAudioListening(formData);
        if (responseImage?.data?.statusCode === 200) {
          setImage(responseImage?.data?.data?.uri);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error", error, fetchData);
        setIsLoading(false);
      }
    }
  };

  const onSubmit = async (data: any) => {
    const keys = ["A", "B", "C", "D"];
    if (openModal.type === "createQuestion") {
      const body = {
        level: "A1",
        answerList: matchingRef?.current?.getContent(),
        directionText: directionRef?.current?.getContent(),
        image: image ? image : "",
        questionTypeTips: editorRef && editorRef?.current?.getContent(),
        questionBox:
          questionType === "SUMMARY_COMPLETION" || questionType === "NOTE_COMPLETION"
            ? editorRef && editorRef?.current?.getContent()
            : data.questionBox,
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
          toast.success("Create question group success!");
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
        answerList: matchingRef && matchingRef?.current?.getContent(),
        directionText: directionRef?.current.getContent(),
        image: image ? image : "",
        questionTypeTips: editorRef && editorRef?.current?.getContent(),
        questionBox:
          questionType === "SUMMARY_COMPLETION" || questionType === "NOTE_COMPLETION"
            ? editorRef && editorRef?.current?.getContent()
            : data.questionBox,
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
          toast.success("Update question group success!");
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

  const renderViewType = (type?: any, data?: any) => {
    switch (type) {
      case "IDENTIFYING_INFORMATION":
        return (
          <>
            {openModal.type !== "detailQuestion" && (
              <div className="text-end">
                <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab mt-2" onClick={onAddQuestion} />
              </div>
            )}
            {fields.map((field, index) => {
              return (
                <div className="flex items-center justify-between mt-2">
                  <div style={{ border: "1px solid #bcbcbc", marginTop: 10, padding: 20, borderRadius: 6, flex: 1 }}>
                    <InputCommon
                      control={control}
                      id="standard-basic"
                      label="Question"
                      variant="standard"
                      name={`questions[${index}].questionText`}
                      disabled={openModal.type === "detailQuestion"}
                      style={{ marginRight: 20 }}
                    />
                    <InputCommon
                      control={control}
                      id="standard-basic"
                      label="Correct answer"
                      variant="standard"
                      name={`questions[${index}].answer`}
                      disabled={openModal.type === "detailQuestion"}
                      style={{ marginTop: 10 }}
                    />
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
        );
      case "MATCHING_SENTENCE_ENDINGS":
      case "MATCHING_HEADINGS":
        return (
          <div className="mt-5">
            <TinyMceCommon
              ref={matchingRef}
              initialValue={dataQuestionDetail?.answerList ? dataQuestionDetail?.answerList : "Matching heading"}
              disabled={openModal.type === "detailQuestion"}
            />
            {openModal.type !== "detailQuestion" && (
              <div className="text-end">
                <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab mt-[20px]" onClick={onAddQuestion} />
              </div>
            )}

            {fields.map((field, index) => {
              return (
                <div className="flex items-end justify-between mt-2">
                  <InputCommon
                    control={control}
                    id="standard-basic"
                    label="Section"
                    variant="standard"
                    name={`questions[${index}].questionText`}
                    disabled={openModal.type === "detailQuestion"}
                  />
                  <InputCommon
                    control={control}
                    id="standard-basic"
                    label="Answer"
                    variant="standard"
                    name={`questions[${index}].answer`}
                    disabled={openModal.type === "detailQuestion"}
                    style={{ marginLeft: 20 }}
                  />
                  {fields.length > 1 && openModal.type !== "detailQuestion" && (
                    <RemoveCircleOutlineIcon
                      className="text-[#F44335] cursor-grab ml-[20px]"
                      onClick={() => onRemoveQuestion(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      case "MULTIPLE_CHOICE_1_ANSWER":
        return (
          <>
            {openModal.type !== "detailQuestion" && (
              <div className="text-end">
                <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab mt-[20px]" onClick={onAddQuestion} />
              </div>
            )}
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
        );
      case "LABELLING_A_PLAN_MAP":
      case "FLOW_CHART_COMPLETION":
        return (
          <>
            <input ref={fileRef} className="hidden" type="file" name="directionAudio" onChange={onFileChange} />
            {(selectFile || dataQuestionDetail?.image) && (
              <img
                id="blah"
                src={selectFile ? URL.createObjectURL(selectFile) : `${IMAGE_URL}/${dataQuestionDetail?.image}`}
                alt="image"
                style={{ width: "100%", maxHeight: 400, marginTop: 20 }}
              />
            )}
            <CommonStyles.Button
              loading={isLoading}
              sx={{ display: "flex", height: 40 }}
              onClick={handleClick}
              style={{ display: "flex", height: 30, marginBottom: 10, marginTop: 10 }}
            >
              Upload image
            </CommonStyles.Button>
            {/* <ButtonUpload
              style={{ display: "flex", height: 30, marginBottom: 10, marginTop: 10 }}
              titleButton="Upload image"
              onClick={handleClick}
            /> */}
            {openModal.type !== "detailQuestion" && (
              <div className="text-end">
                <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab mt-[20px]" onClick={onAddQuestion} />
              </div>
            )}
            {fields.map((field, index) => {
              return (
                <div className="flex items-end justify-between mt-2">
                  <InputCommon
                    control={control}
                    id="standard-basic"
                    label="Section"
                    variant="standard"
                    name={`questions[${index}].questionText`}
                    disabled={openModal.type === "detailQuestion"}
                  />
                  <InputCommon
                    control={control}
                    id="standard-basic"
                    label="Answer"
                    variant="standard"
                    name={`questions[${index}].answer`}
                    disabled={openModal.type === "detailQuestion"}
                    style={{ marginLeft: 20 }}
                  />
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
        );
      case "SUMMARY_COMPLETION":
      case "NOTE_COMPLETION":
        return (
          <div className="mt-5">
            <TinyMceCommon
              ref={editorRef}
              initialValue={dataQuestionDetail?.questionBox ? dataQuestionDetail?.questionBox : "Note completion"}
              disabled={openModal.type === "detailQuestion"}
            />
            {openModal.type !== "detailQuestion" && (
              <div className="text-end">
                <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab mt-[20px]" onClick={onAddQuestion} />
              </div>
            )}
            {fields.map((field, index) => {
              return (
                <div className="flex items-end justify-between mt-2">
                  <div style={{ marginRight: 20 }}>
                    <InputCommon
                      control={control}
                      id="standard-basic"
                      label="Blank number"
                      variant="standard"
                      name={`questions[${index}].blankNumber`}
                      disabled={openModal.type === "detailQuestion"}
                    />
                  </div>
                  <InputCommon
                    control={control}
                    id="standard-basic"
                    label="Answer"
                    variant="standard"
                    name={`questions[${index}].answer`}
                    disabled={openModal.type === "detailQuestion"}
                  />
                  {fields.length > 1 && openModal.type !== "detailQuestion" && (
                    <RemoveCircleOutlineIcon
                      className="text-[#F44335] cursor-grab ml-[20px]"
                      onClick={() => onRemoveQuestion(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      case "SENTENCE_COMPLETION":
        return (
          <div className="mt-5">
            {openModal.type !== "detailQuestion" && (
              <div className="text-end">
                <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab mt-[20px]" onClick={onAddQuestion} />
              </div>
            )}
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex items-center">
                  <div style={{ border: "1px solid #bcbcbc", marginTop: 10, padding: 20, borderRadius: 6, flex: 1 }}>
                    <InputCommon
                      control={control}
                      id="standard-basic"
                      label="Question"
                      variant="standard"
                      name={`questions[${index}].questionText`}
                      disabled={openModal.type === "detailQuestion"}
                    />
                    <div className="flex items-end justify-between mt-2">
                      <div style={{ marginRight: 20 }}>
                        <InputCommon
                          control={control}
                          id="standard-basic"
                          label="Blank number"
                          variant="standard"
                          name={`questions[${index}].blankNumber`}
                          disabled={openModal.type === "detailQuestion"}
                        />
                      </div>
                      <InputCommon
                        control={control}
                        id="standard-basic"
                        label="Answer"
                        variant="standard"
                        name={`questions[${index}].answer`}
                        disabled={openModal.type === "detailQuestion"}
                      />
                    </div>
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
          </div>
        );

      case "IDENTIFYING_VIEWS_CLAIMS":
        return (
          <>
            {openModal.type !== "detailQuestion" && (
              <div className="text-end">
                <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab mt-2" onClick={onAddQuestion} />
              </div>
            )}
            {fields.map((field, index) => {
              return (
                <div className="flex items-center justify-between mt-2">
                  <div style={{ border: "1px solid #bcbcbc", marginTop: 10, padding: 20, borderRadius: 6, flex: 1 }}>
                    <InputCommon
                      control={control}
                      id="standard-basic"
                      label="Question"
                      variant="standard"
                      name={`questions[${index}].questionText`}
                      disabled={openModal.type === "detailQuestion"}
                      style={{ marginRight: 20 }}
                    />
                    <InputCommon
                      control={control}
                      id="standard-basic"
                      label="Correct answer"
                      variant="standard"
                      name={`questions[${index}].answer`}
                      disabled={openModal.type === "detailQuestion"}
                      style={{ marginTop: 10 }}
                    />
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
        );

      default:
        break;
    }
  };

  const renderHeaderModal = (questionType: string) => {
    if (questionType !== "SUMMARY_COMPLETION" && questionType !== "NOTE_COMPLETION") {
      return (
        <>
          {dataQuestionDetail?.questionBox && openModal.type === "detailQuestion" ? (
            <Typography style={{ fontWeight: "bold" }}>{dataQuestionDetail?.questionBox}</Typography>
          ) : (
            <InputCommon
              id="standard-basic"
              label={!dataQuestionDetail?.questionBox ? "Question group" : ""}
              variant="standard"
              name="questionBox"
              control={control}
              required
              fullWidth
            />
          )}
        </>
      );
    } else {
      return <Typography style={{ fontWeight: "bold" }}>Question groups</Typography>;
    }
  };

  return (
    <ModalCreate open={openModal} onClose={onCloseModal} titleModal={renderHeaderModal(questionType)}>
      <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
        <TinyMceCommon
          ref={directionRef}
          initialValue={dataQuestionDetail?.directionText ? dataQuestionDetail?.directionText : "Direction text"}
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
            setValue("questions", [{ section: "" }]);
          }}
          style={{ marginTop: 20 }}
          disabled={openModal.type === "detailQuestion"}
        />

        {renderViewType(questionType)}

        {openModal.type !== "detailQuestion" && renderButton()}
      </form>
    </ModalCreate>
  );
};

export default ModalCreateQuestion;
