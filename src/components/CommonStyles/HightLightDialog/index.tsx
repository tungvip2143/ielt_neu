import React from "react";
import imgHightLight from "assets/image/exam/hight-light-note.png";
import imgNote from "assets/image/exam/note.png";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  option: {
    background: theme.custom?.background.noteReading.optionNote,
    width: "150px",
    padding: "0px 0px 10px 10px",
    boxShadow: theme.custom?.boxShadow.optionNote,
    border: `1px solid ${theme.custom?.border.noteReading.optionItem}`,
    transform: (position: any) => `translate(${position.x},${position.y})`,
    position: "fixed",
    top: "10px",
    left: 0,
    zIndex: 999,
  },
  imgNote: {
    width: "16px",
    height: "16px",
    marginRight: "5px",
    fontWeight: 700,
  },
  noteItem: {
    ...theme.custom?.flexBox.flexAlignItemsCenter,
    fontSize: "12px",
    marginTop: "10px",
    cursor: "pointer",
  },
}));

type Props = {
  onClickHighlight: () => void;
  onClickNote: () => void;
  position: any;
};

const HightLightDialog = (props: Props) => {
  // !State
  const { onClickHighlight, onClickNote, position } = props;
  const classes = useStyle(position);

  // !Render
  return (
    <div className={classes.option}>
      <div onClick={onClickHighlight} className={classes.noteItem}>
        <img className={classes.imgNote} src={imgHightLight} alt="" />
        <p>Hight Light</p>
      </div>
      <div onClick={onClickNote} className={classes.noteItem}>
        <img className={classes.imgNote} src={imgNote} alt="" />
        <p>Note</p>
      </div>
    </div>
  );
};

export default HightLightDialog;
