import { yupResolver } from "@hookform/resolvers/yup";
import InputCommon from "components/Input";
import { LevelType } from "constants/questionType";
import { ResponseParams } from "interfaces/questionInterface";
import SelectField from "components/CustomField/SelectField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Card, Stack } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export interface Props {
  onClose: () => void;
}
const CreateQuestionWriting = (props: Props) => {
  const { onClose } = props;
  const validationSchema = yup.object().shape({});

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const { control, handleSubmit, setValue, getValues } = formController;

  const renderButton = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-center mt-[40px]">
        <Button variant="contained">Save</Button>
        <Button variant="contained" style={{ background: "#f44336" }} onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    );
  };

  return (
    <Card sx={{ minWidth: 275 }} className="p-[20px]">
      <div className="flex items-center">
        <div className="questionContainer">
          <InputCommon
            id="standard-basic"
            label="Question"
            variant="standard"
            name="question"
            control={control}
            required
            fullWidth
          />
          <SelectField
            control={control}
            options={LevelType}
            label="Level"
            variant="standard"
            style={{ marginLeft: 20 }}
            name="levelType"
            setValue={formController.setValue}
          />
        </div>
        <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab" />
      </div>
      {renderButton()}
    </Card>
  );
};

export default CreateQuestionWriting;
