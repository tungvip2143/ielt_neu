import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import { Button, Card, InputAdornment, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import ButtonUpload from "components/Button/ButtonUpload";
import InputCommon from "components/Input";
import { DataAnswer } from "constants/questionType";
import useGetLevels from "hooks/Reading/useGetLevel";
import useGetListReadingQuestion from "hooks/Reading/useGetListReadingQuestion";
import useGetPartDetail from "hooks/Reading/useGetPartDetail";
import useGetQuestionType from "hooks/Reading/useGetQuestionType";
import { QuestionTypeI, ResponseParams } from "interfaces/questionInterface";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReadingService from "services/ReadingService";
import * as yup from "yup";
import ModalCreateQuestion from "./ModalCreateQuestion";
import AudioPlayer from "react-h5-audio-player";


export interface Props {
  onClose: () => void;
  openCreateScreen: any;
  refetchDataTable?: any;
}
const dataMock: any = [];
const CreateQuestionReading = (props: Props) => {
  const { onClose, openCreateScreen, refetchDataTable } = props;
  const editorRef = useRef<any>();
  const [openModal, setOpenModal] = useState(false);
  const fileRef = useRef<any>();
  const [selectFile, setSelectFile] = useState(null);

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
  const [dataPartDetail, , , refetchData] = useGetPartDetail(openCreateScreen?.element?.id);
  const [dataReading, loading, error, , metaReading] = useGetListReadingQuestion(openCreateScreen?.element?.id);
  const [isEdit, setIsEdit] = useState(false);

  console.log("dataReading", dataReading);

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { partTitle: openCreateScreen?.element?.passageTitle || "" },
  });

  const { control, handleSubmit, setValue, getValues } = formController;

  const handleOpenFile = () => {
    fileRef.current.click();
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
            disabled
          />
        );
        break;
    }
  };

  const renderButtonUpdate = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-end mb-[10px]">
        <Button component="a" href="#as-link" startIcon={<UndoIcon />} onClick={onClose}>
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
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={onClose} />{" "}
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
          alert("Create part success!");
          refetchDataTable();
          onClose();
        }
      } catch (error) {
        console.log("error");
      }
    }
    if (openCreateScreen.type === "update") {
      const body = {
        passageTitle: data.partTitle,
        passageText: editorRef.current.getContent(),
      };

      try {
        const response = await ReadingService.patchUpdatePart(openCreateScreen?.element?.id, body);
        if (response.data.statusCode === 200) {
          alert("Update part success!");
          refetchDataTable();
          onClose();
        }
      } catch (error) {
        console.log("error");
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      {openCreateScreen.type === "update" && renderButtonUpdate()}
      <Card style={{ marginBottom: "15px", padding: 20 }}>
        <Typography style={{ fontWeight: "bold" }}>
          {openCreateScreen.type === "update" ? "Update part" : "Create part"}
        </Typography>
        <InputCommon
          id="standard-basic"
          label="Passage title"
          variant="standard"
          name="partTitle"
          control={control}
          required
          fullWidth
          defaultValue={dataPartDetail && dataPartDetail.passageTitle}
          disabled={openCreateScreen.type === "update" && !isEdit}
          style={{ marginTop: dataPartDetail?.passageTitle ? "10px" : 0 }}
        />
      </Card>
      <Card sx={{ minWidth: 275 }} className="p-[20px] mb-[20px] flex-1">
        <Editor
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
              onClick={() => setOpenModal(true)}
              style={{ background: "#9155FE" }}
            />
          </div>
          <div>
            {(dataReading || []).map((el: any) => {
              return (
                <Card style={{ marginBottom: "15px", padding: 20 }}>
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
                  <div style={{ display: "flex", justifyContent: "end", marginTop: 10 }}>
                    <Button>Detail</Button>
                    <Button color="success">Update</Button>
                    <Button color="error">Delete</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
      <ModalCreateQuestion
        openModal={openModal}
        onCloseModal={() => setOpenModal(false)}
        id={openCreateScreen?.element?.id}
      />
    </form>
  );
};

export default CreateQuestionReading;
