import { Box, FormControl, FormControlLabel, RadioGroup, Stack } from "@mui/material";
import Radio from "components/Radio";
import { Field, useFormikContext } from "formik";
import ReactHtmlParser from "react-html-parser";
import Text from "../../../../../components/Typography/index";
import { themeCssSx } from "../../../../../ThemeCssSx/ThemeCssSx";
import { makeStyles } from "@mui/styles";
// ! type
interface Props {
  dataQuestions?: any;
  audio?: any;
  onClickPage: (options: any) => void;

  isView?: boolean;
}

const useStyles = makeStyles((theme) => {
  return {
    formAnswer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    itemAnswer: {
      width: "49%",
      marginBottom: "30px",
    },
    questionNumber: {
      marginRight: "5px",
      fontWeight: 700,
      color: theme.palette.text.primary,
    },
    title: {
      background: theme.custom?.background.questionItemMultichoose,
      padding: "10px 20px",
      marginBottom: "10px",
      borderRadius: "5px",
    },
    question: {
      color: theme.palette.text.primary,
    },
  };
});

const MultiChoice = ({ dataQuestions, audio, onClickPage, isView = false }: Props) => {
  const classes = useStyles();
  const { values }: any = useFormikContext();

  // !Fucntion
  const onClickQuestion = (questionIdx: number) => {
    onClickPage && onClickPage({ question: questionIdx });
  };

  // !Render
  return (
    <>
      <Box sx={{ mb: "20px" }}></Box>
      <Box className={classes.formAnswer}>
        {dataQuestions.map((item: any, questionIdx: number) => {
          return (
            <Box className={classes.itemAnswer} onClick={() => onClickQuestion(questionIdx)}>
              <Stack direction="row" className={classes.title}>
                <Text.DescSmall className={classes.questionNumber}>{item.question.displayNumber}.</Text.DescSmall>
                <Text.DescSmall className={classes.question}>
                  {ReactHtmlParser(item.question.questionText)}
                </Text.DescSmall>
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
