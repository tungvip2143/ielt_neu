import $ from "jquery";
import { useEffect, useRef } from "react";

export const useHightLightText = () => {
  const markId = useRef(0);

  useEffect(() => {
    const markIdCurrent = markId.current + 1;
    console.log("markIdCurrent", markIdCurrent);
    function getSelectedText() {
      let t = document.all
        ? document?.selection.createRange().text
        : document.getSelection();
      return t;
    }

    $("body").mouseup(function () {
      var selection = getSelectedText();
      var selection_text = selection.toString();
      console.log("selection", selection);
      console.log("selection", document.getSelection());
      // How do I add a span around the selected text?

      var mark = document.createElement("MARK");
      mark.textContent = selection_text;
      mark.className = markIdCurrent;

      if (selection) {
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(mark);
        mark.onclick = () => {
          //   range.deleteContents();
        };
      }
    });
  }, []);
};
