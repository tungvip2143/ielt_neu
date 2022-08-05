import { Button, Card, FormGroup, InputAdornment, Stack } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import { useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Editor } from "@tinymce/tinymce-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import SelectField from "components/CustomField/SelectField";
import InputCommon from "components/Input";
import { DataAnswer, LevelType, QuestionType } from "constants/questionType";
import { QuestionTypeI, ResponseParams } from "interfaces/questionInterface";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { DriveEtaOutlined } from "@mui/icons-material";
import ButtonSave from "components/Button/ButtonSave";
import SaveIcon from "@mui/icons-material/Save";
import ButtonCancel from "components/Button/ButtonCancel";
import BlockIcon from "@mui/icons-material/Block";

export interface Props {
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  questionSimple: yup
    .string()
    .required("This field is required!")
    .min(6, "This field must be at least 6 characters")
    .max(200, "This field must not exceed 200 characters"),
  questionType: yup.object().required("This field is required!"),
  question: yup.string().required("This field is required!"),
  levelType: yup.string().required("This field is required!"),
  firstAnswer: yup.string().required("This field is required!"),
  secondAnswer: yup.string().required("This field is required!"),
  thirdAnswer: yup.string().required("This field is required!"),
  fourAnswer: yup.string().required("This field is required!"),
  correctAnswer: yup.string().required("This field is required!"),
});
const CreateQuestionListening = (props: Props) => {
  const { onClose } = props;
  const imageRef = useRef<any>();
  const fileRef = useRef<any>();
  const editorRef = useRef<any>();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectFile, setSelectFile] = useState(null);
  const [questionType, setQuestionType] = useState<number | undefined | string>(1);

  const handleOpenFileInput = () => {
    imageRef.current.click();
  };
  const handleOpenFile = () => {
    fileRef.current.click();
  };

  //    const log = () => {
  //      if (editorRef.current) {
  //        console.log(editorRef.current.getContent());
  //      }
  //    };

  const formController = useForm<ResponseParams>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const { control, handleSubmit, setValue, getValues } = formController;
  const onSubmit = (data: any) => {};

  const renderMultiChoice = (item: any) => {
    return (
      <InputCommon
        control={control}
        id="standard-basic"
        label={item.title}
        variant="standard"
        name={item.name}
        InputProps={{
          startAdornment: <InputAdornment position="start">{item.answer}</InputAdornment>,
        }}
      />
    );
  };

  const renderViewAnswer = (type: number | undefined | string) => {
    switch (type) {
      case 1:
        return DataAnswer.map((item: QuestionTypeI) => renderMultiChoice(item));
      case 3:
        return DataAnswer.map((item: QuestionTypeI) => renderMultiChoice(item));
      default:
        return (
          <InputCommon
            control={control}
            id="standard-basic"
            label="Correct answer"
            variant="standard"
            name="questionSimple"
          />
        );
        break;
    }
  };
  const renderButton = () => {
    return (
      <Stack spacing={2} direction="row" className="justify-center mt-[40px]">
        <ButtonSave icon={<SaveIcon sx={{ fontSize: "20px" }} />} />
        <ButtonCancel icon={<BlockIcon sx={{ fontSize: "20px" }} />} onClick={onClose} />
      </Stack>
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
      <div className="flex">
        <div style={{ minWidth: 275, flex: 1 }}>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              plugins: "link image code",
              toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
            }}
          />
          {selectFile && (
            <AudioPlayer
              // autoPlay
              preload="none"
              style={{ borderRadius: "1rem", textAlign: "center", marginTop: 20 }}
              src={URL.createObjectURL(selectFile)}
              onPlay={(e) => console.log("onPlay")}
              showJumpControls={false}
              loop={false}
            />
          )}
          <input
            ref={fileRef}
            className="hidden"
            type="file"
            name="listenFile"
            onChange={(event: any) => {
              setSelectFile(event.target.files[0]);
            }}
          />
          <div className="text-start">
            <ButtonUpload
              titleButton="Upload audio"
              onClick={handleOpenFile}
              style={{ marginTop: 20, background: "#9155FE" }}
            ></ButtonUpload>
          </div>
        </div>
        <Card sx={{ minWidth: 275 }} className="p-[20px] flex-1 ml-[20px]">
          <FormGroup>
            <SelectField
              control={control}
              options={QuestionType}
              label="Type Of Question"
              name="questionType"
              setValue={formController.setValue}
              onChangeExtra={(e) => {
                setValue("questionType", e?.value);
                setQuestionType(e?.value);
              }}
            />
          </FormGroup>
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
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { width: "25ch", marginRight: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="grid grid-cols-2 gap-4">{renderViewAnswer(questionType)}</div>
            {(questionType === 1 || questionType === 3) && (
              <InputCommon
                control={control}
                id="standard-basic"
                label="Correct answer"
                variant="standard"
                name="correctAnswer"
              />
            )}
          </Box>
        </Card>
      </div>
      {renderButton()}
    </form>
  );
};

export default CreateQuestionListening;
