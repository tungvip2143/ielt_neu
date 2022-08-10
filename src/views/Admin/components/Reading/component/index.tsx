import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import { Button, Card, InputAdornment, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import ButtonUpload from "components/Button/ButtonUpload";
import InputCommon from "components/Input";
import useGetListReadingQuestion from "hooks/Reading/useGetListReadingQuestion";
import useGetPartDetail from "hooks/Reading/useGetPartDetail";
import { ResponseParams } from "interfaces/questionInterface";
import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReadingService from "services/ReadingService";
import * as yup from "yup";
import ModalCreateQuestion from "./ModalCreateQuestion";

export interface Props {
  onClose: () => void;
  openCreateScreen: any;
  refetchDataTable?: any;
}
const CreateQuestionReading = (props: Props) => {
  const { onClose, openCreateScreen, refetchDataTable } = props;
  const editorRef = useRef<any>();
  const [openModal, setOpenModal] = useState({});

  const validationSchema = yup.object().shape({
    partTitle: yup.string().required("This field is required!"),
  });
  const [dataPartDetail, , , refetchData] = useGetPartDetail(openCreateScreen?.element?.id);
  const [dataReading, loading, error, refetchQuestionGroup] = useGetListReadingQuestion(openCreateScreen?.element?.id);
  const [isEdit, setIsEdit] = useState(false);

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { partTitle: openCreateScreen?.element?.passageTitle || "" },
  });

  const { control, handleSubmit, setValue, getValues } = formController;

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
        console.log("error", error);
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
        console.log("error", error);
      }
    }
  };

  const onDelete = async (id: number | string) => {
    try {
      await ReadingService.deleteQuestionGroup(id);
      alert("Delete question group success");
      refetchQuestionGroup();
      // }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      {openCreateScreen.type === "update" && renderButtonUpdate()}
      <Card style={{ marginBottom: "15px", padding: 20 }}>
        <Typography style={{ fontWeight: "bold" }}>Reading title</Typography>
        <InputCommon
          id="standard-basic"
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
        <Typography>{isEmpty(editorRef?.current?.getContent()) && "This is field required"}</Typography>
      </Card>
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
                      style={{ color: "#5048E5", fontSize: "20px", cursor: "grab" }}
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
          id={openCreateScreen?.element?.id}
        />
      )}
    </form>
  );
};

export default CreateQuestionReading;
