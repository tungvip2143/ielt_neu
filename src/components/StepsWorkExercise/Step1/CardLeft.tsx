import React, { useState, useEffect } from "react";
//
import ReactHtmlParser, { convertNodeToElement, processNodes } from "react-html-parser";
import { Debug } from "components/Formik/FormikDebug";
import { makeStyles } from "@mui/styles";
import { IELT_TEST } from "interfaces/testType";
import { decode } from "html-entities";
import { ROOT_ORIGINAL_URL } from "constants/api";
import imgHightLight from "assets/image/exam/hight-light-note.png";
import imgNote from "assets/image/exam/note.png";
import useRef from "react";
import { useMemo } from "react";

// !type

interface Props {
  dataChangePart: any;
  test?: string;
  onClickHiglightCallback?: (text: string) => void;
}

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
  },
  img: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  option: {
    background: "#eee",
    width: "150px",
    padding: "0px 0px 10px 10px",
    boxShadow: "0 2px 5px rgb(0 0 0 / 50%)",
    border: "1px solid #ddd",
  },
  noteItem: {
    ...theme.custom?.flexBox.flexAlignItemsCenter,
    fontSize: "12px",
    marginTop: "10px",
    cursor: "pointer",
  },
}));

const CardLeft = ({ dataChangePart, onClickHiglightCallback, test }: Props) => {
  //! State
  const [showOption, setShowOption] = useState(false);
  const classes = useStyles();
  const [textHiglighted, setTextHighlighted] = useState({});

  const passageTextWithHighlightTexted = useMemo(() => {
    if (dataChangePart?.passageText) {
      let tempPassageText = dataChangePart.passageText;
      //* Add highlight text to passageText
      Object.entries(textHiglighted).forEach(([raw, changed]) => {
        tempPassageText = tempPassageText.replace(raw, changed);
      });

      return tempPassageText;
    }

    return "";
  }, [dataChangePart.passageText, textHiglighted]);

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      setShowOption(true);
    });
  }, []);

  //! Fucntion
  const cardLeft = () => {
    setShowOption(false);
  };

  //
  console.log("123123", window?.getSelection());
  const getTextSelection = window?.getSelection()?.toString() || "";
  const onClickHighlight = () => {
    let isTextHighlighted = false;
    Object.keys(textHiglighted).forEach((eachTextHighlighted) => {
      if (eachTextHighlighted.includes(getTextSelection)) {
        isTextHighlighted = true;
      }
    });

    console.log({ textHiglighted, getTextSelection });
    setShowOption(false);

    setTextHighlighted((prevText) => {
      return {
        ...prevText,
        [getTextSelection]: `<mark>${getTextSelection}</mark>`,
      };
    });
    onClickHiglightCallback && onClickHiglightCallback(getTextSelection);
  };

  const noteText = () => {
    setShowOption(false);
  };
  //
  const imgNoteCss = {
    width: "16px",
    height: "16px",
    marginRight: "5px",
    fontWeight: 700,
  };

  //! Render
  return (
    <>
      <div onClick={cardLeft} className="">
        <div dangerouslySetInnerHTML={{ __html: decode(passageTextWithHighlightTexted) || "" }}></div>
        {showOption && (
          <div className={classes.option}>
            <div onClick={onClickHighlight} className={classes.noteItem}>
              <img style={imgNoteCss} src={imgHightLight} alt="" />
              <p>Hight Light</p>
            </div>
            <div onClick={noteText} className={classes.noteItem}>
              <img style={imgNoteCss} src={imgNote} alt="" />
              <p>Note</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CardLeft;
