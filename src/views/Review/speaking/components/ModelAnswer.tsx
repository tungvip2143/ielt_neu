import { makeStyles } from "@mui/styles";
import Text from "components/Typography";
import { ROOT_ORIGINAL_URL } from "constants/api";
import React from "react";
import ReactAudioPlayer from "react-audio-player";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  audio: {
    display: "flex",
    justifyContent: "center",
  },
}));

type Props = {
  audio: string;
};

const ModelAnswer = (props: Props) => {
  // !State
  const { audio } = props;
  const classes = useStyles();

  // !Render
  return (
    <div className={classes.container}>
      <Text.SubTitle>Model Answer</Text.SubTitle>
      <div className={classes.audio}>
        <ReactAudioPlayer src={`${ROOT_ORIGINAL_URL}/${audio}`} controls />
      </div>
    </div>
  );
};

export default ModelAnswer;
