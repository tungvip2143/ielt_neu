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
import React, { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import SelectField from "components/CustomField/SelectField";
import * as yup from "yup";
import { LevelType } from "constants/questionType";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export interface Props {
  onClose: () => void;
  openCreateScreen: any;
}
const CreateQuestionWriting = (props: Props) => {
  const editorRef = useRef<any>();
  const { onClose, openCreateScreen } = props;
  const [isEdit, setIsEdit] = useState(false);

  const validationSchema = yup.object().shape({});

  const { register, control, handleSubmit, reset, watch, setValue } = useForm<any>({
    defaultValues: {
      test: [{ question: "Bill", levelType: "Luo" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "test", // unique name for your Field Array
  });

  const onAddQuestion = () => {
    append({ question: "Bill", levelType: "Luo" });
  };

  const onRemoveQuestion = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: any) => console.log("data", data);

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
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
      </Card>
      <Card sx={{ minWidth: 275 }} className="p-[20px] mb-[20px] flex-1">
        <Editor
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={"<p>This is the initial content of the editor.</p>"}
          init={{
            plugins: "link image code",
            toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
          }}
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
      </Card>
      {openCreateScreen.type === "create" && renderButtonCreate()}
      {/* <div className="text-end mb-2">
        <ButtonUpload
          titleButton="Create question"
          icon={<AddIcon />}
          style={{ background: "#9155FE" }}
          onClick={onAddQuestion}
        />
      </div> */}
      <Card sx={{ minWidth: 275 }} className="p-[20px] mt-[10px]">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end">
            <InputCommon
              id="standard-basic"
              label="Question"
              variant="standard"
              name={`test[${index}].question`}
              control={control}
              required
              fullWidth
            />
            <SelectField
              control={control}
              options={[
                { label: "Part 1", value: "part_1" },
                { label: "Part 2", value: "part_2" },
              ]}
              label="Level"
              variant="standard"
              style={{ marginLeft: 20 }}
              name={`test[${index}].levelType`}
              setValue={setValue}
            />
            {fields.length > 1 && (
              <RemoveCircleOutlineIcon
                className="text-[#F44335] cursor-grab ml-[20px]"
                onClick={() => onRemoveQuestion(index)}
              />
            )}
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "end", marginTop: 10 }}>
          <Button color="success">Save</Button>
          <Button color="error">Delete</Button>
        </div>
      </Card>
    </form>
  );
};

export default CreateQuestionWriting;
