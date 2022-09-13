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
import { useHightLightText } from "hooks/ielts/useHightLightTextScannerHook";
import CommonStyles from "components/CommonStyles";

// !type

interface Props {
  dataChangePart: any;
  test?: string;
}

const CardLeft = ({ dataChangePart, test }: Props) => {
  //! State
  let text = dataChangePart.passageText;
  const { values, setFieldValue } = useFormikContext();
  console.log("values123", values);
  const {
    onScannerText,
    onHightlight,
    passageTextWithHighlightTexted,
    position,
    isOpenOptionClear,
    onCloseNote,
    onClearHightLightAll,
    onClickNote,
    onClearHightLight,
    isNoted,
    isHightLight,
    onInputChange,
  } = useHightLightText({ text, values, onChangeInput: setFieldValue, tagName: "DIV" });

  //! Render
  return (
    <>
      <div style={{ height: "100%" }}>
        <div
          onClick={(data) => onScannerText(data)}
          style={{ zIndex: 999 }}
          dangerouslySetInnerHTML={{ __html: decode(passageTextWithHighlightTexted) || "" }}
        ></div>
        {isHightLight && (
          <CommonStyles.HightLightDialog
            onClickHighlight={onHightlight}
            onClickNote={onClickNote}
            position={position}
          />
        )}
        {isOpenOptionClear && (
          <CommonStyles.ClearDialog
            onClearHightlight={onClearHightLight}
            onClearHightlightAll={onClearHightLightAll}
            position={position}
          />
        )}
        <CommonStyles.Note
          isOpenNote={isNoted}
          onCloseNote={onCloseNote}
          onChangeTextNote={onInputChange}
          position={position}
        />
      </div>
    </>
  );
};

export default CardLeft;
