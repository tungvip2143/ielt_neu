import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import { Button, Card, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import ButtonUpload from "components/Button/ButtonUpload";
import InputCommon from "components/Input";
import useGetPartDetail from "hooks/UserManagement/useGetPartDetail";
import { ResponseParams } from "interfaces/questionInterface";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import SelectField from "components/CustomField/SelectField";
import { RouteBase } from "constants/routeUrl";
import userService from "services/userService";
import DatePickerCommon from "components/DatePickerCommon";

export interface Props {
  openCreateScreen: {
    type: string;
  };
}
const CreateUser = (props: Props) => {
  //! State
  const { openCreateScreen } = props;
  //Get id from url
  const { search } = useLocation();
  const id = search.split("=")[1];

  const [openModal, setOpenModal] = useState({});
  const [err, setErr] = useState("");
  const history = useHistory();

  const validationSchema = yup.object().shape({
    // studentId: yup.string.required("This field is required!"),
    // questionTip: yup.string().required("This field is required!"),
    email: yup.string().required("This field is required!"),
    userType: yup.string().required("This field is required!"),
    fullname: yup.string().required("This field is required!"),
    dob: yup
      .string()
      .typeError("This field is required!")
      .required("Required")
      .test("dob", "Date of birth is invalid!", (val) => Boolean(val)),
    // string().required("This field is required!"),
    password: yup.string().required("This field is required!"),
    username: yup.string().required("This field is required!"),
  });
  const [dataPartDetail, , , refetchData] = useGetPartDetail(id);
  const [isEdit, setIsEdit] = useState(false);
  const fileRef = useRef<any>("avatar");

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // studentId:
      username: dataPartDetail?.username || "",
      fullname: dataPartDetail?.fullname || "",
      email: dataPartDetail?.email || "",
      userType: dataPartDetail?.fullname || "",
      dob: dataPartDetail?.dob || new Date(),
      password: dataPartDetail?.password || "",
    },
  });

  const { control, handleSubmit, setValue, getValues, reset } = formController;

  //! Effect
  useEffect(() => {
    if (dataPartDetail?.id) {
      resetAsyncForm(dataPartDetail);
    }
  }, [dataPartDetail?.id]);

  //! Function
  const resetAsyncForm = useCallback(
    async (data: any) => {
      reset({
        username: data?.username,
        email: data?.email,
        userType: data?.userType,
        fullname: data?.fullname,
        dob: data?.dob,
        password: data?.password,
      });
    },
    [reset]
  );
  const onFileChange = async (event: any, key: string) => {
    console.log("123");

    // const object = { ...selectFile };
    // object[key] = event.target.files[0];
    // setSelectFile(object);
    // const formData = new FormData();
    // formData.append("file", event.target.files[0]);
    // try {
    //   const responseAudio = await audioService.postAudioListening(formData);
    //   if (responseAudio?.data?.statusCode === 200) {
    //     setValue(key, responseAudio?.data?.data?.uri);
    //   }
    // } catch (error: any) {
    //   toast.error(error);
    // }
  };

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
        <ButtonSave type="submit" icon={<ArrowCircleRightIcon sx={{ fontSize: "20px" }} />} title="Continue" />
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={() => history.goBack()} />{" "}
      </Stack>
    );
  };

  const onSubmit = async (data: any) => {
    if (openCreateScreen.type === "create") {
      const body = {
        username: data.username,
        email: data.email,
        userType: data.userType,
        fullname: data.fullname,
        dob: data.dob,
        password: data.password,
      };
      try {
        const response = await userService.postCreatePart(body);

        if (response.data.statusCode === 200) {
          toast.success("Create part success!");
          history.goBack();
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
    if (openCreateScreen.type === "update") {
      const body = {
        studentId: data.studentId,
        username: data.username,
        email: data.email,
        userType: data.userType,
        fullname: data.fullname,
        dob: data.dob,
        password: data.password,
      };

      try {
        const response = await userService.patchUpdatePart(id, body);
        if (response.data.statusCode === 200) {
          toast.success("Update part success!");
          history.goBack();
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      {openCreateScreen.type === "update" && renderButtonUpdate()}
      <div style={styles.cardTitle}>
        <div className="flex-1">
          <Typography style={{ fontWeight: "bold", marginBottom: "10px" }}>User Detail</Typography>
          <InputCommon
            id="standard-basic"
            variant="standard"
            name="username"
            label="Username"
            control={control}
            required
            fullWidth
            disabled={openCreateScreen.type === "update" && !isEdit}
          />
          <InputCommon
            id="standard-basic"
            variant="standard"
            name="password"
            label="Password"
            control={control}
            required
            fullWidth
            disabled={openCreateScreen.type === "update" && !isEdit}
          />
          <InputCommon
            id="standard-basic"
            variant="standard"
            name="email"
            label="Email"
            control={control}
            required
            fullWidth
            disabled={openCreateScreen.type === "update" && !isEdit}
            sx={{ marginTop: "20px" }}
          />
        </div>
        <div className="flex-1 ml-[20px]">
          <SelectField
            variant="standard"
            name="userType"
            label="User Type"
            options={[
              { label: "USER", value: "USER" },
              { label: "SUPER_ADMIN", value: "SUPER_ADMIN" },
            ]}
            control={control}
            setValue={setValue}
            disabled={openCreateScreen.type === "update" && !isEdit}
          />
          <InputCommon
            id="standard-basic"
            variant="standard"
            name="fullname"
            label="Fullname"
            control={control}
            required
            fullWidth
            disabled={openCreateScreen.type === "update" && !isEdit}
            sx={{ marginTop: "20px" }}
          />
          <DatePickerCommon
            variant="standard"
            control={control}
            name="dob"
            label="Date of birth"
            required
            disabled={openCreateScreen.type === "update" && !isEdit}
            onChange={(e: any) => setValue("dob", e)}
          />
        </div>
        <div className="ml-[20px]">
          <input
            ref={(ref) => (fileRef.current = ref)}
            className="hidden"
            type="file"
            name={"avatar"}
            onChange={(e) => onFileChange(e, "avatar")}
          />
          {/* {openModal.type !== "detailQuestion" && ( */}
          <div className="text-end my-3">
            <ButtonUpload
              style={{ display: "flex", height: 40 }}
              titleButton="Upload Image"
              onClick={() => fileRef.current?.click()}
            />
          </div>
          {/* )} */}
        </div>
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
            {/* {(dataReading || []).map((el: any, index: number) => {
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
            })} */}
          </div>
        </>
      )}
    </form>
  );
};

export default CreateUser;

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
