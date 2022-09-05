import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import BlockIcon from "@mui/icons-material/Block";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AutoCompletedMui } from "components/Autocomplete";
import CommonStyles from "components/CommonStyles";
import InputField from "components/CustomField/InputField";
import TinyMceCommon from "components/TinyMceCommon";
import { partReading } from "constants/enum";
import { RouteBase } from "constants/routeUrl";
import { FastField, Form, Formik } from "formik";
import useGetListReadingQuestion from "hooks/QuestionBank/Reading/useGetListReadingQuestion";
import useGetPartDetail from "hooks/QuestionBank/Reading/useGetPartDetail";
import useToggleDialog from "hooks/useToggleDialog";
import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ReadingService from "services/ReadingService";
import * as yup from "yup";
import ModalCreateQuestion from "../../ModalReading/ModalCreateQuestion";
import QuestionGroupReading from "./QuestionGroupReading";

const useStyles = makeStyles((theme) => ({
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
    boxShadow: "0px 1px 1px rgb(100 116 139 / 6%), 0px 1px 2px rgb(100 116 139 / 10%)",
    borderRadius: "8px",
    alignItems: "end",
  },
  tinyMceContainer: {
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0px 1px 1px rgb(100 116 139 / 6%), 0px 1px 2px rgb(100 116 139 / 10%)",
    marginBottom: "20px",
  },
  buttonStyles: {
    justifyContent: "center",
  },
  buttonContinue: {
    background: "#9155FF !important",
  },
  buttonCancel: {
    background: "#F44335 !important",
  },
}));

const validationSchema = yup.object().shape({
  partTitle: yup.string().required("This field is required!"),
  partNumber: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required(),
  }),
});

export interface Props {
  openCreateScreen: {
    type: string;
  };
}

const CreateReading = (props: Props) => {
  //! State
  const { openCreateScreen } = props;
  const classes = useStyles();
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);

  //Get id from url
  const { search } = useLocation();
  const id = search.split("=")[1];
  const editorRef = useRef<any>();

  //!Hook
  const [dataPartDetail, , , refetchData] = useGetPartDetail(id);
  const [dataReading, loading, error, refetchQuestionGroup] = useGetListReadingQuestion(id);

  const {
    open: openModalQuestion,
    toggle: toggleModalQuestion,
    shouldRender: shouldRenderModalQuestion,
  } = useToggleDialog();

  //!Function
  const onSubmit = async (data: any) => {
    if (openCreateScreen.type === "create") {
      const body = {
        partNumber: data.partNumber.id,
        passageTitle: data.partTitle,
        passageText: editorRef.current.getContent(),
      };

      try {
        const response = await ReadingService.postCreatePart(body);

        if (response.data.statusCode === 200) {
          toast.success("Create part success!");
          history.push({
            pathname: RouteBase.UpdateReadingWId(response?.data?.data?.partTitle),
            search: `?id=${response?.data?.data?.id}`,
          });
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
    if (openCreateScreen.type === "update") {
      const body = {
        partNumber: data.partNumber.id,
        passageTitle: data.partTitle,
        passageText: editorRef.current.getContent(),
      };

      try {
        const response = await ReadingService.patchUpdatePart(id, body);
        if (response.data.statusCode === 200) {
          toast.success("Update part success!");
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  const onSubmitModalQuestion = () => {};

  //!Render component

  const renderButtonUpdate = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-end mb-[10px]">
        <CommonStyles.Button href="#as-link" variant="text" startIcon={<UndoIcon />} onClick={() => history.goBack()}>
          Back
        </CommonStyles.Button>
        {!isEdit ? (
          <CommonStyles.Button variant="contained" onClick={() => setIsEdit(true)}>
            <BorderColorOutlinedIcon style={{ fontSize: 16, marginRight: 10 }} />
            Edit
          </CommonStyles.Button>
        ) : (
          <>
            <CommonStyles.Button
              className={classes.buttonContinue}
              icon={<SaveIcon sx={{ fontSize: "20px" }} />}
              type="submit"
            >
              Save
            </CommonStyles.Button>
            <CommonStyles.Button
              className={classes.buttonCancel}
              icon={<BlockIcon sx={{ fontSize: "20px" }} />}
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </CommonStyles.Button>
          </>
        )}
      </Stack>
    );
  };

  const renderButtonCreate = () => {
    return (
      <Stack spacing={2} direction="row" className={classes.buttonStyles}>
        <CommonStyles.Button
          icon={<ArrowCircleRightIcon sx={{ fontSize: "20px" }} />}
          className={classes.buttonContinue}
          type="submit"
        >
          &nbsp; Continue
        </CommonStyles.Button>
        <CommonStyles.Button
          icon={<BlockIcon sx={{ fontSize: "20px" }} />}
          className={classes.buttonCancel}
          onClick={() => history.goBack()}
        >
          &nbsp; Cancel
        </CommonStyles.Button>
      </Stack>
    );
  };

  //!Render
  return (
    <Formik
      enableReinitialize
      initialValues={{
        partTitle: dataPartDetail?.passageTitle || "",
        partNumber: {
          name: dataPartDetail?.partNumber ? `Part ${dataPartDetail?.partNumber}` : "",
          id: dataPartDetail?.partNumber || "",
        },
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(propsFormik) => {
        return (
          <Form>
            {openCreateScreen.type === "update" && renderButtonUpdate()}
            <div className={classes.cardTitle}>
              <div style={{ flex: 2, marginRight: 20 }}>
                <FastField
                  component={InputField}
                  name="partTitle"
                  label="Reading title"
                  variant="standard"
                  disabled={openCreateScreen.type === "update" && !isEdit}
                />
              </div>
              <div style={{ flex: 1 }}>
                <FastField
                  component={AutoCompletedMui}
                  name="partNumber"
                  label="Part"
                  options={partReading}
                  variant="standard"
                  disabled={openCreateScreen.type === "update" && !isEdit}
                />
              </div>
            </div>
            <div className={classes.tinyMceContainer}>
              <TinyMceCommon
                ref={editorRef}
                initialValue={dataPartDetail ? dataPartDetail.passageText : "Passage text"}
                disabled={openCreateScreen.type === "update" && !isEdit}
              />
            </div>

            {openCreateScreen.type === "create" && renderButtonCreate()}
            {openCreateScreen.type === "update" && (
              <QuestionGroupReading
                onOpenModalEdit={toggleModalQuestion}
                onCreateQuestionGroup={toggleModalQuestion}
                onOpenModalDetail={toggleModalQuestion}
                dataReading={dataReading}
                refetchQuestionGroup={refetchQuestionGroup}
              />
            )}

            {shouldRenderModalQuestion && (
              <ModalCreateQuestion
                open={openModalQuestion}
                toggle={toggleModalQuestion}
                onSubmit={onSubmitModalQuestion}
                isCreate
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateReading;
