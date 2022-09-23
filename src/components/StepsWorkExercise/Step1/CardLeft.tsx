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
import CommonStyles from "components/CommonStyles";
import { useHightLightText } from "hooks/ielts/useHighlightText";
import { useClearHighlight } from "hooks/ielts/useClearHighlight";
import { useRightClick } from "hooks/ielts/useRightClick";
import { useNoted } from "hooks/ielts/useNoted";

// !type

interface Props {
  dataChangePart: any;
}

const CardLeft = ({ dataChangePart }: Props) => {
  //! State
  let text = dataChangePart.passageText;

  const { isAction, position, toggleAction, className } = useRightClick();
  const { clearAll, clearMarkItem } = useClearHighlight({ className });
  const { onChangeInput, onClickNote, isNoted, noted, toggleNote } = useNoted({ toggleAction, className });
  useHightLightText({ noted, toggleNote });

  //! Render
  return (
    <>
      <div style={{ height: "100%" }} className="exam">
        <div style={{ zIndex: 999 }} dangerouslySetInnerHTML={{ __html: decode(text) || "" }}></div>
        {isAction && (
          <CommonStyles.HightLightDialog
            clearAll={clearAll}
            clearMarkItem={clearMarkItem}
            onCloseAction={toggleAction}
            onClickNote={onClickNote}
            position={position}
          />
        )}
        {isNoted && (
          <CommonStyles.Note
            onCloseNote={toggleNote}
            noted={noted}
            position={position}
            onChangeTextNote={onChangeInput}
            className={className}
          />
        )}
      </div>
    </>
  );
};

export default CardLeft;
