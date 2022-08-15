import { Card, Stack } from "@mui/material";
import React from "react";
import InputCommon from "components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import DatePickerCommon from "components/DatePickerCommon";
import ButtonCancel from "components/Button/ButtonCancel";
import ButtonSave from "components/Button/ButtonSave";
import SaveIcon from "@mui/icons-material/Save";
import BlockIcon from "@mui/icons-material/Block";

const validationSchema = yup.object().shape({});

const CreateContest = () => {
  const formController = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const { control, handleSubmit, setValue, getValues, reset } = formController;

  const renderButton = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-center mt-[14px]">
        <ButtonSave icon={<SaveIcon sx={{ fontSize: "20px" }} />} type="submit" />
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={() => history.back()} />{" "}
      </Stack>
    );
  };
  return (
    <div>
      <Card style={styles.cardContainer}>
        <InputCommon
          label="Contest name"
          id="standard-basic"
          variant="standard"
          name="question"
          control={control}
          required
          fullWidth
        />
        <div style={styles.dateContainer}>
          <div className="flex-1">
            <DatePickerCommon control={control} name="startDate" label="Start date" />
          </div>
          <div className="flex-1 ml-[20px]">
            <DatePickerCommon control={control} name="endDate" label="End date" />
          </div>
        </div>
      </Card>
      {renderButton()}
    </div>
  );
};

export default CreateContest;

const styles = {
  cardContainer: {
    padding: 20,
  },
  dateContainer: {
    display: "flex",
    alignItems: "center",
  },
};
