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
import useGetListListeningQuestion from "hooks/Listening/useGetListListeningQuestion";
import useGetPartDetail from "hooks/Listening/useGetPartDetail";
import { ResponseParams } from "interfaces/questionInterface";
import React, { ReactEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ModalCreateQuestion from "./ModalCreateQuestion";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { isEmpty } from "lodash";
import listeningService from "services/listeningService";
import { RouteBase } from "constants/routeUrl";
import SelectField from "components/CustomField/SelectField";
import audioService from "services/audioService";
export interface Props {
  openCreateScreen: {
    type: string;
  };
}
const styles = {
  buttonDetail: {
    color: "#5048E5",
    fontSize: "20px",
    cursor: "grab",
  },
  cardTitle: {
    marginBottom: "15px",
    padding: "20px",
    display: "flex",
    background: "white",
    boxShadow: "0px 1px 1px rgb(100 116 139 / 6%), 0px 1px 2px rgb(100 116 139 / 10%",
    borderRadius: "8px",
    alignItems: "end",
  },
};

const CreateQuestionListening = (props: Props) => {
  const [selectFile, setSelectFile] = useState<any>(null);
  const fileRef = useRef<any>();
  console.log("fileRef", fileRef.current);

  const { openCreateScreen } = props;
  const params = useParams<any>();
  const editorRef = useRef<any>();
  const [openModal, setOpenModal] = useState({});
  const [err, setErr] = useState("");
  const history = useHistory();
  const validationSchema = yup.object().shape({
    partTitle: yup.string().required("This field is required!"),
    // questionTip: yup.string().required("This field is required!"),
    partNumber: yup.string().required("This field is required!"),
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
  console.log("dataPartDetail", dataPartDetail);

  const [dataListening, loading, error, refetchQuestionGroup] = useGetListListeningQuestion(params?.id);
  const [isEdit, setIsEdit] = useState(false);
  console.log("dataReading", dataPartDetail);

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { partTitle: dataPartDetail?.partTitle || "" },
  });

  const { control, handleSubmit, setValue, getValues, reset } = formController;

  const resetAsyncForm = useCallback(
    async (data: any) => {
      reset({
        partTitle: data?.partTitle,
        partNumber: data?.partNumber,
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
        <Button component="a" href="#as-link" startIcon={<UndoIcon />} onClick={() => history.goBack()}>
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
        <ButtonSave icon={<SaveIcon sx={{ fontSize: "20px" }} />} type="submit" title="Continue" />
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={() => history.goBack()} />{" "}
      </Stack>
    );
  };

  const onSubmit = async (data: any) => {
    if (openCreateScreen.type === "create") {
      const formData = new FormData();
      formData.append("file", selectFile);

      try {
        const responseAudio = await audioService.postAudioListening(formData);
        console.log("responseAudio", responseAudio);

        if (responseAudio.data.statusCode === 200) {
          const body = {
            partNumber: data.partNumber,
            partTitle: data.partTitle,
            partAudio: responseAudio?.data?.data?.uri,
          };
          const response = await listeningService.postCreatePart(body);
          if (response.data.statusCode === 200) {
            toast.success("Create part success!");
            history.push(RouteBase.UpdateListeningWId(response?.data?.data?.id));
          }
        }
      } catch (error: any) {
        toast.error(error);
      }
    }

    if (openCreateScreen.type === "update") {
      try {
        let responseAudio = null;
        if (selectFile) {
          const formData = new FormData();
          formData.append("file", selectFile);
          responseAudio = await audioService.postAudioListening(formData);
        }

        const body = {
          partNumber: data.partNumber,
          partTitle: data.partTitle,
          partAudio: responseAudio?.data?.data?.uri ? responseAudio?.data?.data?.uri : dataPartDetail?.partAudio,
        };
        const response = await listeningService.postCreatePart(body);
        if (response.data.statusCode === 200) {
          toast.success("Update speaking success!");
          history.goBack();
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  const onDelete = async (id: number | string) => {
    try {
      await listeningService.deleteQuestionGroup(id);
      alert("Delete question group success");
      refetchQuestionGroup();
    } catch (error) {
      console.log("error");
    }
  };

  const handleOpenFile = () => {
    fileRef.current.click();
  };
  const onChangeFile = (event: any) => {
    setSelectFile(event.target.files[0]);
  };
  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      {openCreateScreen.type === "update" && renderButtonUpdate()}
      <div style={styles.cardTitle}>
        <div className="  -1">
          <Typography style={{ fontWeight: "bold" }}>Listening title</Typography>
          <InputCommon
            id="standard-basic"
            variant="standard"
            name="partTitle"
            control={control}
            required
            fullWidth
            disabled={openCreateScreen.type === "update" && !isEdit}
          />
        </div>

        <div className="flex-1 ml-[20px]">
          <SelectField
            variant="standard"
            name="partNumber"
            label="Part"
            options={[
              { label: "Part 1", value: 1 },
              { label: "Part 2", value: 2 },
              { label: "Part 3", value: 3 },
              { label: "Part 4", value: 4 },
            ]}
            control={control}
            setValue={setValue}
            disabled={openCreateScreen.type === "update" && !isEdit}
          />
        </div>
      </div>
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

      {(selectFile || dataPartDetail?.partAudio) && (
        <AudioPlayer
          // autoPlay
          preload="none"
          style={{ borderRadius: "1rem", textAlign: "center", marginTop: 20, marginBottom: 20 }}
          src={selectFile ? URL.createObjectURL(selectFile) : `http://103.226.250.81:8688/${dataPartDetail?.partAudio}`}
          onPlay={(e) => console.log("onPlay")}
          showJumpControls={false}
          loop={false}
          autoPlayAfterSrcChange={false}
        />
      )}
      <input ref={fileRef} className="hidden" type="file" name="listenFile" onChange={onChangeFile} />
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
            {(dataListening || []).map((el: any, index: number) => {
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
