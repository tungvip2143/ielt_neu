import { Button, Card, Stack, Typography } from "@mui/material";
import React, { useCallback, useRef, useEffect, useState } from "react";
import InputCommon from "components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import DatePickerCommon from "components/DatePickerCommon";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import SaveIcon from "@mui/icons-material/Save";
import BlockIcon from "@mui/icons-material/Block";
import { useHistory, useLocation } from "react-router-dom";
import useGetPartDetail from "hooks/ContestManagemet/useGetPartDetail";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import contestService from "services/contestService";
import { toast } from "react-toastify";
import { RouteBase } from "constants/routeUrl";
import SelectField from "components/CustomField/SelectField";
import TinyMceCommon from "components/TinyMceCommon";
import { ResponseParams } from "interfaces/questionInterface";
import CheckboxField from "components/CustomField/CheckboxField";
import { isArray } from "lodash";
export interface Props {
  openCreateScreen: {
    type: string;
  };
}

const CreateContest = (props: Props) => {
  //! State
  const { openCreateScreen } = props;
  const editorRef = useRef<any>();
  const { search } = useLocation();
  const id = search.split("=")[1];
  const [isEdit, setIsEdit] = useState(false);
  const [err, setErr] = useState("");
  const history = useHistory();
  const validationSchema = yup.object().shape({
    name: yup.string().required("This field is required!"),
    // textField: yup.string().required("This field is required!"),
    active: yup.string().required("This field is required!"),
  });
  const [dataPartDetail, , , refetchData] = useGetPartDetail(id);
  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { name: dataPartDetail?.name || "" },
  });

  const { control, handleSubmit, setValue, getValues, reset } = formController;
  const [valueUserId, setValueUserId] = useState<string[]>([]);
  console.log("valueUserId", valueUserId);

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
  console.log("dataPartDetail.userIds", dataPartDetail.userIds);

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

  const handleChange = (event: any) => {
    console.log("event.target", event.target);
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
        const response = await contestService.postCreatePart(body);

        if (response.data.statusCode === 200) {
          toast.success("Create part success!");
          history.push(RouteBase.UpdateContestManagementWId(response?.data?.data?.name));
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
        const response = await contestService.putUpdatePart(id, body);
        if (response.data.statusCode === 200) {
          toast.success("Update part success!");
          history.goBack();
        }
      } catch (error: any) {
        toast.error(error);
      }
    }
  };
  //! Render

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      {openCreateScreen.type === "update" && renderButtonUpdate()}
      <div style={styles.cardTitle}>
        <div className="flex-1">
          <Typography style={{ fontWeight: "bold" }}>Contest title</Typography>
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
            label="Part"
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

      <Card sx={{ minWidth: 275 }} className="p-[20px] mb-[20px] flex-1">
        {dataPartDetail?.userIds?.map((item: any) => {
          const isChecked = valueUserId?.includes(item);
          return (
            <CheckboxField
              label={item}
              value={item}
              checked={isChecked}
              handleChange={handleChange}
              disabled={openCreateScreen.type === "update" && !isEdit}
            />
          );
        })}

        {/* <TinyMceCommon
          ref={editorRef}
          initialValue={dataPartDetail ? dataPartDetail.passageText : "Passage text"}
          disabled={openCreateScreen.type === "update" && !isEdit}
        /> */}
      </Card>
      {openCreateScreen.type === "create" && renderButtonCreate()}
    </form>
  );
};

export default CreateContest;

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
