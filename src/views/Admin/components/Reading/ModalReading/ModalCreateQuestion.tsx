import BlockIcon from "@mui/icons-material/Block";
import SaveIcon from "@mui/icons-material/Save";
import { Stack, Typography } from "@mui/material";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import InputField from "components/CustomField/InputField";
import ModalCreate from "components/Modal/ModalCreate";
import TinyMceCommon from "components/TinyMceCommon";
import { FastField, Form, Formik, FormikHelpers } from "formik";
import useGetDetailQuestion from "hooks/QuestionBank/Speaking/useGetDetailQuestion";
import { useRef } from "react";
import "react-h5-audio-player/lib/styles.css";
import * as yup from "yup";

export interface Props {
  toggle?: () => void;

  open: boolean;
  isEdit?: boolean;
  isDetail?: boolean;
  isCreate?: boolean;
  onSubmit: (data: any, tinyMCEValye: any, typeModal: any, dataQuestionDetail?: any, helpers?: any) => void;
  idQuestionGroup?: any;
}

const validationSchema = yup.object().shape({
  // questionBox: yup.string().required("This is field required"),
  // questionType: yup.mixed().required("This is field required"),
  // questions: yup.array(
  //   yup.object({
  //     questionText: yup.string().required("This is field required"),
  //     answer: yup.string().required("This is field required"),
  //     options: yup.array(yup.string().required("mmm")),
  //   })
  // ),
});

const ModalCreateQuestion = (props: Props) => {
  //! State
  const {
    open,
    isEdit,
    isCreate,
    isDetail,

    idQuestionGroup,
    toggle = () => {},
    onSubmit: onSubmitModal,
  } = props;

  const editorRef = useRef<any>();
  const usefulGrammarRef = useRef<any>();
  const ideaSuggestionRef = useRef<any>();
  const [dataQuestionDetail, loading, error, refetchData] = useGetDetailQuestion(idQuestionGroup);

  //! Function

  //! Render
  const renderButton = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-center mt-[40px]">
        <ButtonSave icon={<SaveIcon sx={{ fontSize: "20px" }} />} type="submit" />
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={toggle} />
      </Stack>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: dataQuestionDetail?.title || "",
        questions: (dataQuestionDetail?.questions || []).map((el: any) => ({
          questionAudio: el?.questionAudio || "",
          questionText: el?.questionText || "",
          modelAnswerAudio: el?.modelAnswerAudio || "",
          modelAnswer: el?.modelAnswer || "",
        })),
      }}
      onSubmit={(values: any, helpersFormik: FormikHelpers<any>) => {
        onSubmitModal(
          values,
          {
            explanationText: editorRef.current.getContent(),
            usefulGrammarNVocab: usefulGrammarRef.current.getContent(),
            ideaSuggestion: ideaSuggestionRef.current.getContent(),
          },
          { isCreate, isEdit },
          dataQuestionDetail,
          { toggle }
        );
      }}
    >
      {() => (
        <ModalCreate
          open={open}
          onClose={toggle}
          titleModal={
            dataQuestionDetail?.title && isDetail ? (
              <Typography style={{ fontWeight: "bold" }}>{dataQuestionDetail?.title}</Typography>
            ) : (
              <FastField
                component={InputField}
                id="standard-basic"
                label={!dataQuestionDetail?.title ? "Question group" : ""}
                name="title"
                variant="standard"
                required
                fullWidth
              />
            )
          }
        >
          <Form>
            <TinyMceCommon
              ref={editorRef}
              initialValue={
                dataQuestionDetail?.explanationText ? dataQuestionDetail?.explanationText : "Explanation text"
              }
              disabled={isDetail}
            />

            <div className="my-[15px]">
              <TinyMceCommon
                ref={usefulGrammarRef}
                initialValue={
                  dataQuestionDetail?.usefulGrammarNVocab ? dataQuestionDetail?.usefulGrammarNVocab : "Useful grammar"
                }
                disabled={isDetail}
              />
            </div>

            <TinyMceCommon
              ref={ideaSuggestionRef}
              initialValue={dataQuestionDetail?.ideaSuggestion ? dataQuestionDetail?.ideaSuggestion : "Idea suggestion"}
              disabled={isDetail}
            />

            {!isDetail && renderButton()}
          </Form>
        </ModalCreate>
      )}
    </Formik>
  );
};

export default ModalCreateQuestion;
