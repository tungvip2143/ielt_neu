import { makeStyles } from "@mui/styles";
import Text from "components/Typography";
import React from "react";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  explanation: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: 16,
    gap: 16,
  },
}));
type Props = {
  correctAnswer: string;
  studenAnswer: string;
  explanation: any;
};

const ExplanationBox = (props: Props) => {
  // !State
  const classes = useStyles();
  const { correctAnswer, studenAnswer, explanation } = props;

  return (
    <div className={classes.explanation}>
      <div>
        <Text.CardTitle>{`Correct Answer : ${correctAnswer}`}</Text.CardTitle>
        <Text.CardTitle>{`Your Selection : ${studenAnswer}`}</Text.CardTitle>
      </div>

      <div>
        <Text.CardTitle>Explanation</Text.CardTitle>
        {ReactHtmlParser(explanation)}
      </div>
    </div>
  );
};

export default ExplanationBox;
