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
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RouteBase } from "constants/routeUrl";
import TinyMceCommon from "components/TinyMceCommon";

export interface Props {
  openCreateScreen: {
    type: string;
  };
}
const CreateQuestionWriting = (props: Props) => {
  const history = useHistory();
  const editorRef = useRef<any>();
  const modelRef = useRef<any>();
  const usefulGrammarRef = useRef<any>();
  const ideaSuggestionRef = useRef<any>();
  const organizationRef = useRef<any>();
  const params = useParams<any>();
  const { openCreateScreen } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [dataQuestionDetail, loading, error, refetchData] = useGetDetailQuestion(params?.id);

  const validationSchema = yup.object().shape({
    title: yup.string().required("This is field required"),
    questionPartNumber: yup.string().required("This is field required"),
  });

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
        questionText: editorRef.current.getContent(),
        title: data.title,
        usefulGrammarNVocab: usefulGrammarRef.current.getContent(),
        ideaSuggestion: ideaSuggestionRef.current.getContent(),
        organization: organizationRef.current.getContent(),
        modelAnswer: modelRef.current.getContent(),
        questionPartNumber: data.questionPartNumber,
      };
      try {
        const response = await writingServices.postCreateQuestion(body);
        if (response?.data?.statusCode === 200) {
          toast.success("Create writing part success");
          history.goBack();
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
        questionText: editorRef.current.getContent(),
        title: data.title,
        usefulGrammarNVocab: usefulGrammarRef.current.getContent(),
        ideaSuggestion: ideaSuggestionRef.current.getContent(),
        organization: organizationRef.current.getContent(),
        modelAnswer: modelRef.current.getContent(),
        questionPartNumber: data.questionPartNumber,
      };
      try {
        const response = await writingServices.patchUpdateQuestion(params?.id, body);
        if (response?.data?.statusCode === 200) {
          toast.success("Update writing part success");
          history.goBack();
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
        questionPartNumber: data?.questionPartNumber,
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
          <Button component="a" href="#as-link" startIcon={<UndoIcon />} onClick={() => history.goBack()}>
            Back
          </Button>
          <Button variant="contained" onClick={() => setIsEdit(true)}>
            <BorderColorOutlinedIcon style={{ fontSize: 16, cursor: "grab", marginRight: 10 }} />
            Edit
          </Button>
        </Stack>
      )}

      <div style={styles.questionGroup}>
        <div className="flex items-end">
          <div className="flex-1">
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
          </div>
          <div className="flex-1 ml-[20px]">
            <SelectField
              control={control}
              options={[
                { label: "Part 1", value: 1 },
                { label: "Part 2", value: 2 },
              ]}
              label="Part"
              variant="standard"
              name="questionPartNumber"
              setValue={setValue}
              disabled={openCreateScreen.type === "update" && !isEdit}
            />
          </div>
        </div>
      </div>
      {/* <Card className="p-[20px] mt-5">
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
      </Card> */}
      <Card sx={{ minWidth: 275 }} className="p-[20px] my-[20px] flex-1">
        <TinyMceCommon
          ref={editorRef}
          initialValue={dataQuestionDetail?.questionText ? dataQuestionDetail?.questionText : "Question"}
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
      </Card>
      <Card sx={{ minWidth: 275 }} className="p-[20px] my-[20px] flex-1">
        <TinyMceCommon
          ref={modelRef}
          initialValue={dataQuestionDetail?.modelAnswer ? dataQuestionDetail?.modelAnswer : "Model answer"}
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
      </Card>
      <Card sx={{ minWidth: 275 }} className="p-[20px] my-[20px] flex-1">
        <TinyMceCommon
          ref={usefulGrammarRef}
          initialValue={
            dataQuestionDetail?.usefulGrammarNVocab ? dataQuestionDetail?.usefulGrammarNVocab : "Useful grammar"
          }
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
      </Card>
      <Card sx={{ minWidth: 275 }} className="p-[20px] my-[20px] flex-1">
        <TinyMceCommon
          ref={ideaSuggestionRef}
          initialValue={dataQuestionDetail?.ideaSuggestion ? dataQuestionDetail?.ideaSuggestion : "Idea suggestion"}
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
      </Card>
      <Card sx={{ minWidth: 275 }} className="p-[20px] my-[20px] flex-1">
        <TinyMceCommon
          ref={organizationRef}
          initialValue={dataQuestionDetail?.organization ? dataQuestionDetail?.organization : "Organization"}
          disabled={openCreateScreen.type === "update" && !isEdit}
        />
      </Card>

      {(isEdit || openCreateScreen.type === "create") && (
        <Stack spacing={2} direction="row" className="justify-center mt-[40px]">
          <ButtonSave type="submit" icon={<SaveIcon />} title="Continue" />
          <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={() => history.goBack()} />
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
