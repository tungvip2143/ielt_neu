import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import { Button, Card, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import ButtonUpload from "components/Button/ButtonUpload";
import InputCommon from "components/Input";
import useGetListReadingQuestion from "hooks/Reading/useGetListReadingQuestion";
import useGetPartDetail from "hooks/Reading/useGetPartDetail";
import { ResponseParams } from "interfaces/questionInterface";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReadingService from "services/ReadingService";
import * as yup from "yup";
import ModalCreateQuestion from "./ModalCreateQuestion";
import AudioPlayer from "react-h5-audio-player";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { isEmpty } from "lodash";
export interface Props {
  openCreateScreen: {
    type: string;
  };
}

const CreateQuestionListening = (props: Props) => {
  const [selectFile, setSelectFile] = useState(null);
  const fileRef = useRef<any>();
  const { openCreateScreen } = props;
  console.log("openCreateScreen", openCreateScreen);

  const params = useParams<any>();
  const editorRef = useRef<any>();
  const [openModal, setOpenModal] = useState({});
  const [err, setErr] = useState("");
  const validationSchema = yup.object().shape({
    // questionSimple: yup
    //   .string()
    //   .required("This field is required!")
    //   .min(6, "This field must be at least 6 characters")
    //   .max(200, "This field must not exceed 200 characters"),
    // questionType: yup.mixed().required("This field is required!"),
    // question: yup.string().required("This field is required!"),
    // levelType: yup.mixed().required("This field is required!"),
    // firstAnswer: yup.string().required("This field is required!"),
    // secondAnswer: yup.string().required("This field is required!"),
    // thirdAnswer: yup.string().required("This field is required!"),
    // fourAnswer: yup.string().required("This field is required!"),
    // correctAnswer: yup.string().required("This field is required!"),
  });
  const [dataPartDetail, , , refetchData] = useGetPartDetail(params?.id);
  const [dataReading, loading, error, refetchQuestionGroup] = useGetListReadingQuestion(params?.id);
  const [isEdit, setIsEdit] = useState(false);

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { partTitle: dataPartDetail?.passageTitle || "" },
  });

  const { control, handleSubmit, setValue, getValues, reset } = formController;

  const resetAsyncForm = useCallback(
    async (data: any) => {
      reset({
        partTitle: data?.passageTitle,
      });
    },
    [reset]
  );

  useEffect(() => {
    if (dataPartDetail?.id) {
      resetAsyncForm(dataPartDetail);
    }
  }, [dataPartDetail?.id]);

  const renderButtonUpdate = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-end mb-[10px]">
        <Button component="a" href="#as-link" startIcon={<UndoIcon />} onClick={() => history.back()}>
          Back
        </Button>
        {!isEdit ? (
          <Button variant="contained" onClick={() => setIsEdit(true)}>
            <BorderColorOutlinedIcon style={{ fontSize: 16, cursor: "grab", marginRight: 10 }} />
            Edit
          </Button>
        ) : (
          <>
            <ButtonSave icon={<SaveIcon sx={{ fontSize: "20px" }} />} type="submit" />
            <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={() => setIsEdit(false)} />{" "}
          </>
        )}
      </Stack>
    );
  };

  const renderButtonCreate = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-center mt-[14px]">
        <ButtonSave icon={<SaveIcon sx={{ fontSize: "20px" }} />} type="submit" />
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={() => history.back()} />{" "}
      </Stack>
    );
  };

  const onSubmit = async (data: any) => {
    if (openCreateScreen.type === "create") {
      const body = {
        passageTitle: data.partTitle,
        passageText: editorRef.current.getContent(),
      };
      try {
        const response = await ReadingService.postCreatePart(body);

        if (response.data.statusCode === 200) {
          toast.success("Create part success!");
          history.back();
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
    if (openCreateScreen.type === "update") {
      const body = {
        passageTitle: data.partTitle,
        passageText: editorRef.current.getContent(),
      };
      try {
        const response = await ReadingService.patchUpdatePart(params?.id, body);
        if (response.data.statusCode === 200) {
          toast.success("Update part success!");
          history.back();
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  const onDelete = async (id: number | string) => {
    try {
      await ReadingService.deleteQuestionGroup(id);
      alert("Delete question group success");
      refetchQuestionGroup();
    } catch (error) {
      console.log("error");
    }
  };

  const handleOpenFile = () => {
    fileRef.current.click();
  };
  // const renderMultiChoice = (item: any) => {
  //   return (
  //     <InputCommon
  //       control={control}
  //       id="standard-basic"
  //       label={item.title}
  //       variant="standard"
  //       name={item.name}
  //       InputProps={{
  //         startAdornment: <InputAdornment position="start">{item.answer}</InputAdornment>,
  //       }}
  //     />
  //   );
  // };

  // const renderViewAnswer = (type: number | undefined | string) => {
  //   switch (type) {
  //     case 1:
  //       return DataAnswer.map((item: QuestionTypeI, index: number) => {
  //         return <div key={index}>{renderMultiChoice(item)}</div>;
  //       });
  //     case 3:
  //       return DataAnswer.map((item: QuestionTypeI, index: number) => {
  //         return <div key={index}>{renderMultiChoice(item)}</div>;
  //       });
  //     default:
  //       return (
  //         <InputCommon
  //           control={control}
  //           id="standard-basic"
  //           label="Correct answer"
  //           variant="standard"
  //           name="questionSimple"
  //           disabled
  //         />
  //       );
  //       break;
  //   }
  // };

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      {openCreateScreen.type === "update" && renderButtonUpdate()}
      <Card style={{ marginBottom: "15px", padding: 20 }}>
        <Typography style={{ fontWeight: "bold" }}>Listening title</Typography>
        <InputCommon
          id="standard-basic"
          variant="standard"
          name="partTitle"
          control={control}
          required
          fullWidth
          disabled={openCreateScreen.type === "update" && !isEdit}
          style={{ marginTop: dataPartDetail?.passageTitle ? "10px" : 0 }}
        />
      </Card>
      <Card sx={{ minWidth: 275 }} className="p-[20px] mb-[20px] flex-1">
        <Editor
          tagName="questionTip"
          apiKey="no-api-key"
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={
            dataPartDetail ? dataPartDetail.passageText : "<p>This is the initial content of the editor.</p>"
          }
          init={{
            plugins: "link image code",
            toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
          }}
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
        <Typography>{err}</Typography>
      </Card>

      {selectFile && (
        <AudioPlayer
          // autoPlay
          preload="none"
          style={{ borderRadius: "1rem", textAlign: "center", marginTop: 20, marginBottom: 20 }}
          src={URL.createObjectURL(selectFile)}
          onPlay={(e) => console.log("onPlay")}
          showJumpControls={false}
          loop={false}
        />
      )}
      <input
        ref={fileRef}
        className="hidden"
        type="file"
        name="listenFile"
        onChange={(event: any) => {
          setSelectFile(event.target.files[0]);
        }}
      />
      <div className="text-end mb-2">
        <ButtonUpload
          style={{ display: "flex" }}
          titleButton="Upload audio"
          onClick={handleOpenFile}
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
      </div>
      {openCreateScreen.type === "create" && renderButtonCreate()}
      {openCreateScreen.type === "update" && (
        <>
          <div className="text-end mb-2">
            <ButtonUpload
              titleButton="Create question group"
              icon={<AddIcon />}
              onClick={() => setOpenModal({ type: "createQuestion" })}
              style={{ background: "#9155FE" }}
            />
          </div>
          <div>
            {(dataReading || []).map((el: any, index: number) => {
              return (
                <Card style={{ marginBottom: "15px", padding: 20 }} key={index}>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <InfoOutlinedIcon
                      style={styles.buttonDetail}
                      onClick={() => setOpenModal({ type: "detailQuestion", id: el.id })}
                    />
                    <EditIcon
                      style={{ color: "#15B8A6", fontSize: "20px", cursor: "grab", marginLeft: 10, marginRight: 10 }}
                      onClick={() => setOpenModal({ type: "updateQuestion", id: el.id })}
                    />
                    <HighlightOffOutlinedIcon
                      style={{ color: "#f44336", fontSize: "20px", cursor: "grab" }}
                      onClick={() => onDelete(el.id)}
                    />
                  </div>
                  <Typography style={{ fontWeight: "bold" }}>Question groups</Typography>
                  <InputCommon
                    id="standard-basic"
                    variant="standard"
                    name="question"
                    control={control}
                    required
                    fullWidth
                    value={el.questionBox}
                    disabled
                    style={{ marginTop: el.questionBox ? "10px" : 0 }}
                  />
                </Card>
              );
            })}
          </div>
        </>
      )}
      {!isEmpty(openModal) && (
        <ModalCreateQuestion
          fetchData={refetchQuestionGroup}
          openModal={openModal}
          onCloseModal={() => setOpenModal({})}
          id={params?.id}
        />
      )}
    </form>
  );
};

export default CreateQuestionListening;

const styles = {
  buttonDetail: {
    color: "#5048E5",
    fontSize: "20px",
    cursor: "grab",
  },
};
