import React from "react";
import imgClear from "assets/image/exam/clear-item.png";
import imgClearAll from "assets/image/exam/clear-all.png";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  option: {},
  noteItem: {},
  imageNote: {},
}));
type Props = {
  onClearItemNote: () => void;
  onClearAllNote: () => void;
};

const ClearDialog = (props: Props) => {
  // !State
  const classes = useStyle();
  const { onClearItemNote, onClearAllNote } = props;

  // !Render
  return (
    <div className={classes.option}>
      <div onClick={onClearItemNote} className={classes.noteItem}>
        <img className={classes.imageNote} src={imgClear} alt="" />
        <p>Clear</p>
      </div>
      <div onClick={onClearAllNote} className={classes.noteItem}>
        <img className={classes.imageNote} src={imgClearAll} alt="" />
        <p>Clear all</p>
      </div>
    </div>
  );
};

export default ClearDialog;
