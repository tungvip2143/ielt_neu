import { yupResolver } from "@hookform/resolvers/yup";
import BlockIcon from "@mui/icons-material/Block";
import SaveIcon from "@mui/icons-material/Save";
import { Stack, Typography } from "@mui/material";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import ButtonUpload from "components/Button/ButtonUpload";
import SelectField from "components/CustomField/SelectField";
import InputCommon from "components/Input";
import useContestManagemet from "hooks/ContestManagemet/useContestManagemet";
import useGetPartDetail from "hooks/ContestManagemet/useGetPartDetail";
import { ResponseParams } from "interfaces/questionInterface";
import { QuestionUser } from "interfaces/user";
import { isArray } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import contestService from "services/contestService";
import fileService from "services/fileService";
import * as yup from "yup";
import ListUserContest from "./ListUserContest";
import "./styles.scss";

export interface Props {
  openCreateScreen: {
    type: string;
  };
}

const CreateContest = (props: Props) => {
  //! State
  const fileRef = useRef<any>();
  const { openCreateScreen } = props;
  const { search } = useLocation();
  const id = search.split("=")[1];
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [valueUserId, setValueUserId] = useState<string[]>([]);

  console.log("valueUserId", valueUserId);

  const validationSchema = yup.object().shape({
    name: yup.string().required("This field is required!"),
    active: yup.string().required("This field is required!"),
  });
  const [selectFile, setSelectFile] = useState<any>("");
  const [file, setFile] = useState<any>();

  const [dataContest, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] =
    useContestManagemet();
  const [dataPartDetail, , , refetchData] = useGetPartDetail(id);

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { name: dataPartDetail?.name || "" },
  });

  const { control, handleSubmit, setValue, getValues, reset } = formController;
  const [dataFileExcel, setDataFileExcel] = useState([]);
  const handlePickImage = () => {
    fileRef.current.click();
  };

  const onFileChange = async (event: any) => {
    if (event.target && event.target.files[0]) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("name", "fileUser");
      setSelectFile(event.target.files[0]);
      try {
        const responseFile = await fileService.postFileExcel(formData);
        if (responseFile?.data?.statusCode === 200) {
          console.log("responseFile", responseFile);

          setFile(responseFile?.data?.data?.uri);
          toast.success("Upload file success");
          setValueUserId(responseFile?.data?.data?.studentIds);
          setDataFileExcel(responseFile?.data?.data);
        }
      } catch (error) {}
    }
  };
  //! Effect
  useEffect(() => {
    if (dataPartDetail?.id) {
      resetAsyncForm(dataPartDetail);
    }
  }, [dataPartDetail?.id]);
  useEffect(() => {
    if (isArray(dataPartDetail?.userIds)) {
      setValueUserId(dataPartDetail?.userIds);
    }
  }, [dataPartDetail?.userIds]);

  //! Function
  const resetAsyncForm = useCallback(
    async (data: any) => {
      reset({
        name: data?.name,
        active: data?.active,
      });
    },
    [reset]
  );

  const renderButtonCreate = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-center mt-[14px]">
        <ButtonSave icon={<SaveIcon sx={{ fontSize: "20px" }} />} type="submit" title="Save" />
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={() => history.goBack()} />{" "}
      </Stack>
    );
  };

  const handleChange = (event: any) => {
    if (isArray(valueUserId) && valueUserId?.includes(event.target.value)) {
      setValueUserId(valueUserId.filter((elm) => elm != event.target.value));
      return;
    }
    setValueUserId([...valueUserId, event.target.value]);
  };

  const onSubmit = async (data: any) => {
    if (openCreateScreen.type === "create") {
      const body = {
        name: data.name,
        active: data.active,
        userIds: valueUserId,
      };

      try {
        const response = await contestService.postCreateExamination(body);

        if (response.data.statusCode === 200) {
          toast.success("Create part success!");
          history.goBack();
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
    if (openCreateScreen.type === "update") {
      const body = {
        name: data.name,
        active: data.active,
        userIds: valueUserId,
      };

      try {
        const response = await contestService.putUpdateExamination(id, body);
        if (response.data.statusCode === 200) {
          toast.success("Update part success!");
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
  };
  //! Render

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      {/* {openCreateScreen.type === "update" && renderButtonUpdate()} */}
      <div className="cardContainer">
        <div className="flex-1">
          <Typography style={{ fontWeight: "bold" }}>Examination name</Typography>
          <InputCommon
            id="standard-basic"
            variant="standard"
            name="name"
            control={control}
            required
            fullWidth
            disabled={openCreateScreen.type === "update" && !isEdit}
          />
        </div>
        <div className="flex-1 ml-[20px]">
          <SelectField
            variant="standard"
            name="active"
            label="Status"
            options={[
              { label: "True", value: true },
              { label: "False", value: false },
            ]}
            control={control}
            setValue={setValue}
            disabled={openCreateScreen.type === "update" && !isEdit}
          />
        </div>
      </div>
      <div className="flex justify-end mb-2">
        <input ref={fileRef} className="hidden" type="file" name="file" onChange={onFileChange} />

        <ButtonUpload
          style={{ display: "flex", height: 40, marginBottom: 10, marginTop: 10 }}
          titleButton="Import file user"
          onClick={handlePickImage}
        />
      </div>

      {openCreateScreen.type === "create" && renderButtonCreate()}
      <div className="mt-10">
        <ListUserContest dataFileExcel={dataFileExcel} />
      </div>
    </form>
  );
};

export default CreateContest;
