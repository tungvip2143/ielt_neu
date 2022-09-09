import { Box, FormControl, FormControlLabel, RadioGroup, Stack } from "@mui/material";
import Radio from "components/Radio";
import { Field, useFormikContext } from "formik";
import ReactHtmlParser from "react-html-parser";
import Text from "../../../../../components/Typography/index";
import { themeCssSx } from "../../../../../ThemeCssSx/ThemeCssSx";
// ! type
interface Props {
  dataQuestions?: any;
  audio?: any;
  onClickPage: (options: any) => void;

  isView?: boolean;
}
const formAnswer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
};
const itemAnswer = {
  width: "49%",
  mb: "30px",
};
const questionNumber = {
  mr: "5px",
  fontWeight: 700,
  color: themeCssSx.color.title,
};
const title = {
  background: "#f7f9fb",
  padding: "10px 20px",
  mb: "10px",
  borderRadius: "5px",
};
const question = {
  color: themeCssSx.color.title,
};

const MultiChoice = ({ dataQuestions, audio, onClickPage, isView = false }: Props) => {
  const { values }: any = useFormikContext();

  // !Fucntion
  const onClickQuestion = (questionIdx: number) => {
    onClickPage && onClickPage({ question: questionIdx });
  };

  // !Render
  return (
    <>
      <Box sx={{ mb: "20px" }}></Box>
      <Box sx={formAnswer}>
        {dataQuestions.map((item: any, questionIdx: number) => {
          return (
            <Box sx={itemAnswer} onClick={() => onClickQuestion(questionIdx)}>
              <Stack direction="row" sx={title}>
                <Text.DescSmall sx={questionNumber}>{item.question.displayNumber}</Text.DescSmall>
                <Text.DescSmall sx={question}>{ReactHtmlParser(item.question.questionText)}</Text.DescSmall>
              </Stack>

              <FormControl sx={{ padding: "0 20px" }}>
                {item?.question?.options.map((answerChoice: any) => {
                  const displayNumber = Number(item.question.displayNumber) - 1;
                  return (
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="radio-buttons-group"
                      value={isView ? false : values?.answers[displayNumber]?.studentAnswer}
                    >
                      <FormControlLabel
                        disabled={isView}
                        key={answerChoice._id}
                        value={answerChoice.key}
                        label={`${answerChoice.text}`}
                        control={
                          <Field
                            questionId={item.question._id}
                            index={displayNumber}
                            component={Radio}
                            name={`answers[${displayNumber}].studentAnswer`}
                          />
                        }
                      />
                    </RadioGroup>
                  );
                })}
              </FormControl>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default MultiChoice;
