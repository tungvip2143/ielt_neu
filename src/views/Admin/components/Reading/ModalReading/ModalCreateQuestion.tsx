import BlockIcon from "@mui/icons-material/Block";
import SaveIcon from "@mui/icons-material/Save";
import { Stack, Typography } from "@mui/material";
import { AutoCompletedMui } from "components/Autocomplete";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import CommonIcons from "components/CommonIcons";
import MultiChoiceType from "components/CommonQuestionType/MultiChoiceType";
import InputField from "components/CustomField/InputField";
import ModalCreate from "components/Modal/ModalCreate";
import TinyMceCommon from "components/TinyMceCommon";
import { FastField, Form, Formik, FormikHelpers } from "formik";
import useGetQuestionType from "hooks/QuestionBank/Reading/useGetQuestionType";
import useGetDetailQuestion from "hooks/QuestionBank/Speaking/useGetDetailQuestion";
import { AnyCnameRecord } from "node:dns";
import { useRef, useState } from "react";
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
  arrayHelpers?: any;
  name?: string;
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
    name,
    idQuestionGroup,
    toggle = () => {},
    onSubmit: onSubmitModal,
    arrayHelpers,
  } = props;
  const { form } = arrayHelpers || {};
  const directionRef = useRef<any>();
  const [questionType, setQuestionType] = useState();

  //!Hook
  const [dataQuestionType] = useGetQuestionType();
  const [dataQuestionDetail, loading, error, refetchData] = useGetDetailQuestion(idQuestionGroup);
  //! Function

  const valueOfList = arrayHelpers?.form?.values?.[name] || [];

  //! Render
  const renderViewQuestionType = (type: any, data: any) => {
    switch (type) {
      case "MULTIPLE_CHOICE_1_ANSWER":
        return <MultiChoiceType questions={data?.questions || dataQuestionDetail?.questions} />;

      default:
        break;
    }
  };
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
        questions: dataQuestionDetail?.questions?.map((el: any) => ({
          answer: "",
          explanationText: "",
          questionText: el?.questionBox,
          blankNumber: el?.blankNumber,
          options: el.options?.map((e: any) => [{ key: e.key, text: e.text }]),
        })) || [
          { answer: "", explanationText: "", questionText: "", blankNumber: "", options: [{ key: "", value: "" }] },
        ],
        questionType: {
          name: "",
          id: "",
        },
      }}
      onSubmit={(values: any, helpersFormik: FormikHelpers<any>) => {
        onSubmitModal(
          values,
          {
            directionText: directionRef.current.getContent(),
          },
          { isCreate, isEdit },
          dataQuestionDetail,
          { toggle }
        );
      }}
    >
      {(propsFormik) => (
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
              ref={directionRef}
              initialValue={dataQuestionDetail?.directionText ? dataQuestionDetail?.directionText : "Direction text"}
              // disabled={openModal.type === "detailQuestion"}
            />
            <FastField
              component={AutoCompletedMui}
              name="questionType"
              label="Type Of Question"
              options={dataQuestionType}
              loading={loading}
              // onChange={(e: any) => {
              //   setQuestionType(e?.value);
              // }}
              style={{ marginTop: "20px" }}
            />
            {/* {!isDetail && ( */}
            <div className="text-end">
              <CommonIcons.AddCircle
                className="text-[#9155FF] cursor-grab mt-[20px]"
                onClick={() => arrayHelpers.push({ questionText: "" })}
              />
            </div>
            {/* )} */}

            {renderViewQuestionType(propsFormik.values.questionType.id, propsFormik.values)}
          </Form>
        </ModalCreate>
      )}
    </Formik>
  );
};

export default ModalCreateQuestion;
