import { useEffect, useState } from "react";
//
import { makeStyles } from "@mui/styles";
import imgHightLight from "assets/image/exam/hight-light-note.png";
import imgNote from "assets/image/exam/note.png";
import imgClear from "assets/image/exam/clear-item.png";
import imgClearAll from "assets/image/exam/clear-all.png";

import imgCloseNote from "assets/image/exam/test-help/img-close.png";
import { decode } from "html-entities";
import { useMemo, useRef } from "react";
import { useFormikContext } from "formik";

// !type

interface Props {
  dataChangePart: any;
  test?: string;
}

const CardLeft = ({ dataChangePart, test }: Props) => {
  //! State
  const idMark: any = useRef(0);
  const [showOption, setShowOption] = useState(false);
  const [textHiglighted, setTextHighlighted] = useState<any>({});
  const [isOpenNote, setIsOpenNote] = useState(false);
  const [translate, setTransLate] = useState<any>({ x: 0, y: 0 });
  const [textNote, setTextNote] = useState("");
  const [isOpenOptionClear, setIsOpenOptionClear] = useState(false);
  const { setFieldValue, values }: any = useFormikContext();
  const [clickHightLight, setClickHightLight] = useState("");
  const noteRef: any = useRef(null);
  console.log("noteRef", noteRef.current?.value);
  //
  console.log("values formik", values);
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
      background: theme.custom?.background.noteReading.optionNote,
      width: "150px",
      padding: "0px 0px 10px 10px",
      boxShadow: theme.custom?.boxShadow.optionNote,
      border: `1px solid ${theme.custom?.border.noteReading.optionItem}`,
      transform: `translate(${translate.x},${translate.y})`,
      position: "fixed",
      top: "10px",
      left: 0,
      zIndex: 999,
    },
    noteItem: {
      ...theme.custom?.flexBox.flexAlignItemsCenter,
      fontSize: "12px",
      marginTop: "10px",
      cursor: "pointer",
    },
    noteContainer: {
      width: "220px",
      background: theme.custom?.background.noteReading.content,
      borderRadius: "6px",
      transform: `translate(${translate.x},${translate.y})`,
      position: "fixed",
      top: "10px",
      left: 0,
      zIndex: 999,
    },
    noteHeader: {
      background: theme.custom?.background.noteReading.header,
      borderRadius: "6px 6px 0px 0px",
      borderBottom: "1px solid",
      padding: "5px 5px",
    },
    noteContent: {},
    contentNote: {
      width: "100%",
      border: "none",
      background: theme.custom?.background.noteReading.content,
      outline: "none",
      padding: "10px 10px 200px 10px",
    },
    imgClose: {
      marginLeft: "auto",
      display: "flex",
      cursor: "pointer",
    },
  }));
  const classes = useStyles();

  //
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
      const x = `${event.pageX}px`;
      const y = `${event.pageY}px`;

      setTransLate({ x, y });
    });
  }, []);

  useEffect(() => {
    const marks = document.querySelectorAll("[class*=mark-]");

    const handler = (event: any) => {
      setIsOpenNote(true);
      const x = `${event.pageX}px`;
      const y = `${event.pageY}px`;
      setTransLate({ x, y });
    };

    if (marks) {
      //* Add event click to each mark
      marks.forEach((mark) => {
        mark.addEventListener("click", handler);
      });
    }

    return () => {
      marks.forEach((mark) => {
        mark.removeEventListener("click", handler);
      });
    };
  });
  const notes = document.querySelectorAll(".hight-light-note");
  useEffect(() => {
    const handlerMouseRight = (event: any) => {
      let valueInTag = event.target.innerHTML.split("<")[0];
      setClickHightLight(valueInTag);
      setIsOpenOptionClear(true);
      const x = `${event.pageX}px`;
      const y = `${event.pageY}px`;
      setTransLate({ x, y });
    };
    if (notes) {
      //* Add event click to each mark
      notes.forEach((note) => {
        note.addEventListener("contextmenu", handlerMouseRight);
      });
    }
  });

  //! Fucntion
  const onChangeTextNote = (e: any) => {
    const valueInputNote = e.target.value || "";
    const key = idMark.current;
    setFieldValue(`${key}`, valueInputNote);
  };

  const cardLeft = () => {
    setShowOption(false);
    // setIsOpenNote(false);
    setIsOpenOptionClear(false);
  };

  //
  const getTextSelection = window?.getSelection()?.toString() || "";
  //
  const highLightText = () => {
    setTextHighlighted((prevText: any) => {
      idMark.current = idMark.current + 1;
      return {
        ...prevText,
        [getTextSelection]: `<mark id="mark-${idMark.current}" >${getTextSelection}</mark>`,
      };
    });
  };
  //

  const highlightWithTextNote = () => {
    idMark.current = idMark.current + 1;

    setTextHighlighted((prevText: any) => {
      return {
        ...prevText,
        [getTextSelection]: `<span id="${idMark.current}" class="mark-${idMark.current} hight-light-note">${getTextSelection} <span class="hover-note"></span></span>`,
      };
    });
  };

  const textNote234: any = document.querySelector(`.mark-${idMark.current}`);
  if (textNote234) {
    textNote234.onclick = () => {
      const textarea: any = document.getElementById("note");
      if (textarea) {
        const key = idMark.current;
        textarea.value = values[key];
      }
    };
  }

  const onClickHighlight = () => {
    setShowOption(false);
    highLightText();
  };

  const onClickNote = () => {
    highlightWithTextNote();
    setShowOption(false);
    setIsOpenNote(true);
  };
  //
  const onCloseNote = () => {
    setIsOpenNote(false);
    const textarea: any = document.getElementById("note");
    if (textarea) {
      textarea.value = "";
    }
  };

  const onClearItemNote = () => {
    textHiglighted[clickHightLight] = clickHightLight;
    setTextHighlighted(textHiglighted);
  };
  const onClearAllNote = () => {
    setTextHighlighted({});
  };

  const onClickHightLight = (data: any) => {
    const spanHightLight = data.target;
    const noteId = spanHightLight.getAttribute("id");

    const textarea: any = document.getElementById("note");
    if (textarea) {
      textarea.value = values[noteId] ? values[noteId] : "";
    }
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
      <div onClick={cardLeft} style={{ height: "100%" }}>
        <div
          onClick={(data) => onClickHightLight(data)}
          style={{ zIndex: 999 }}
          dangerouslySetInnerHTML={{ __html: decode(passageTextWithHighlightTexted) || "" }}
        ></div>
        {showOption && (
          <div className={classes.option}>
            <div onClick={onClickHighlight} className={classes.noteItem}>
              <img style={imgNoteCss} src={imgHightLight} alt="" />
              <p>Hight Light</p>
            </div>
            <div onClick={onClickNote} className={classes.noteItem}>
              <img style={imgNoteCss} src={imgNote} alt="" />
              <p>Note</p>
            </div>
          </div>
        )}

        <div style={{ display: isOpenNote ? "block" : "none" }} className={classes.noteContainer}>
          <div className={classes.noteHeader}>
            <img src={imgCloseNote} alt="" onClick={onCloseNote} className={classes.imgClose} />
          </div>
          <div className={classes.noteContent}>
            <textarea
              ref={noteRef}
              className={classes.contentNote}
              onChange={onChangeTextNote}
              defaultValue={textNote}
              id="note"
            />
          </div>
        </div>

        {isOpenOptionClear && (
          <div className={classes.option}>
            <div onClick={onClearItemNote} className={classes.noteItem}>
              <img style={imgNoteCss} src={imgClear} alt="" />
              <p>Clear</p>
            </div>
            <div onClick={onClearAllNote} className={classes.noteItem}>
              <img style={imgNoteCss} src={imgClearAll} alt="" />
              <p>Clear all</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CardLeft;
