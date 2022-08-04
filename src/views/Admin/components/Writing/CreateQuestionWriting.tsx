import { yupResolver } from "@hookform/resolvers/yup";
import InputCommon from "components/Input";
import { LevelType } from "constants/questionType";
import { ResponseParams } from "interfaces/questionInterface";
import SelectField from "components/CustomField/SelectField";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Card, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export interface Props {
  onClose: () => void;
}
const CreateQuestionWriting = (props: Props) => {
  const { onClose } = props;
  const validationSchema = yup.object().shape({});

  // const formController = useForm<ResponseParams>({
  //   mode: "onChange",
  //   resolver: yupResolver(validationSchema),
  //   defaultValues: validationSchema.getDefault(),
  // });
  // const { control, register } = useForm();
  const { register, control, handleSubmit, reset, watch, setValue } = useForm<any>({
    defaultValues: {
      test: [{ question: "Bill", levelType: "Luo" }],
    },
  });
  // const { control } = formController;

  const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "test", // unique name for your Field Array
  });

  const onAddQuestion = () => {
    append({ question: "Bill", levelType: "Luo" });
  };

  const renderButton = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-center mt-[40px]">
        <Button variant="contained" type="submit" style={{ background: "#9155FE" }}>
          Save
        </Button>
        <Button variant="contained" style={{ background: "#f44336" }} onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    );
  };

  const onRemoveQuestion = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: any) => console.log("data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-end mb-2">
        <AddCircleOutlineIcon className="text-[#9155FF] cursor-grab ml-[10px]" onClick={onAddQuestion} />
      </div>
      <Card sx={{ minWidth: 275 }} className="p-[20px]">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end">
            <InputCommon
              id="standard-basic"
              label="Question"
              variant="standard"
              name={`test[${index}].question`}
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
              name={`test[${index}].levelType`}
              setValue={setValue}
            />
            {fields.length > 1 && (
              <RemoveCircleOutlineIcon
                className="text-[#F44335] cursor-grab ml-[20px]"
                onClick={() => onRemoveQuestion(index)}
              />
            )}
          </div>
        ))}
        {renderButton()}
      </Card>
    </form>
  );
};

export default CreateQuestionWriting;
