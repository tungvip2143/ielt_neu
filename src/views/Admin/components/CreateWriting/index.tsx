import { yupResolver } from "@hookform/resolvers/yup";
import BlockIcon from "@mui/icons-material/Block";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import { Card, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import SelectField from "components/CustomField/SelectField";
import InputCommon from "components/Input";
import useGetDetailQuestion from "hooks/Writing/useGetDetailQuestion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import writingServices from "services/writingServices";
import * as yup from "yup";
import UndoIcon from "@mui/icons-material/Undo";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export interface Props {
  openCreateScreen: {
    type: string;
  };
}
const CreateQuestionWriting = (props: Props) => {
  const editorRef = useRef<any>();
  const params = useParams<any>();
  const { openCreateScreen } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [dataQuestionDetail, loading, error, refetchData] = useGetDetailQuestion(params?.id);

  const validationSchema = yup.object().shape({});

  const { register, control, handleSubmit, reset, watch, setValue } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault({}),
  });

  const onSubmit = async (data: any) => {
    if (openCreateScreen.type === "create") {
      const body = {
        level: "A1",
        analysisType: "NONE",
        questionType: "LINE_GRAPH",
        image: "uploads/2022/01/01/pepe.png",
        questionText: data.questionText,
        title: data.title,
        tips: editorRef.current.getContent(),
        usefulGrammarNVocab: "<p>Text</p>",
        ideaSuggestion: "<p>Text</p>",
        organization: "<p>Text</p>",
        modelAnswer: "<p>Text</p>",
      };
      try {
        const response = await writingServices.postCreateQuestion(body);
        if (response?.data?.statusCode === 200) {
          toast.success("Create writing part success");
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
    if (openCreateScreen.type === "update") {
      const body = {
        level: "A1",
        analysisType: "NONE",
        questionType: "LINE_GRAPH",
        image: "uploads/2022/01/01/pepe.png",
        questionText: data.questionText,
        title: data.title,
        tips: editorRef.current.getContent(),
        usefulGrammarNVocab: "<p>Text</p>",
        ideaSuggestion: "<p>Text</p>",
        organization: "<p>Text</p>",
        modelAnswer: "<p>Text</p>",
      };
      try {
        const response = await writingServices.patchUpdateQuestion(params?.id, body);
        if (response?.data?.statusCode === 200) {
          toast.success("Update writing part success");
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  const resetAsyncForm = useCallback(
    async (data: any) => {
      reset({
        title: data?.title,
        questionText: data?.questionText,
        part: data?.level,
      });
    },
    [reset]
  );

  useEffect(() => {
    if (dataQuestionDetail?.id) {
      resetAsyncForm(dataQuestionDetail);
    }
  }, [dataQuestionDetail?.id]);

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      {!isEdit && openCreateScreen.type === "update" && (
        <Stack spacing={2} direction="row" className="justify-end mb-[10px]">
          <Button component="a" href="#as-link" startIcon={<UndoIcon />} onClick={() => history.back()}>
            Back
          </Button>
          <Button variant="contained" onClick={() => setIsEdit(true)}>
            <BorderColorOutlinedIcon style={{ fontSize: 16, cursor: "grab", marginRight: 10 }} />
            Edit
          </Button>
        </Stack>
      )}
      <Card style={{ marginBottom: "15px", padding: 20 }}>
        <Typography style={{ fontWeight: "bold" }}>Writing title</Typography>
        <InputCommon
          id="standard-basic"
          variant="standard"
          name="title"
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
          initialValue={
            dataQuestionDetail?.tips ? dataQuestionDetail?.tips : "<p>This is the initial content of the editor.</p>"
          }
          init={{
            plugins: "link image code",
            toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
          }}
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
      </Card>

      <div style={styles.questionGroup}>
        <div className="flex items-end">
          <InputCommon
            id="standard-basic"
            label="Question"
            variant="standard"
            name="questionText"
            control={control}
            required
            fullWidth
            disabled={openCreateScreen.type === "update" && !isEdit}
          />
          <SelectField
            control={control}
            options={[
              { label: "Part 1", value: "part_1" },
              { label: "Part 2", value: "part_2" },
            ]}
            label="Part"
            variant="standard"
            style={{ marginLeft: 20 }}
            name="part"
            setValue={setValue}
            disabled={openCreateScreen.type === "update" && !isEdit}
          />
        </div>
      </div>
      {/* </Card> */}
      {(isEdit || openCreateScreen.type === "create") && (
        <Stack spacing={2} direction="row" className="justify-center mt-[40px]">
          <ButtonSave type="submit" icon={<SaveIcon />} />
          <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={() => history.back()} />
        </Stack>
      )}
    </form>
  );
};

export default CreateQuestionWriting;

const styles = {
  questionGroup: {
    background: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0px 1px 1px rgb(100 116 139 / 6%), 0px 1px 2px rgb(100 116 139 / 10%)",
  },
};
