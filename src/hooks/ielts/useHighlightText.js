import $ from "jquery";
import { useEffect, useRef } from "react";

export const useHightLightText = ({ noted, toggleNote }) => {
  const highlight = useRef(0);

  useEffect(() => {
    function getSelectedText() {
      let t = document.all
        ? document?.selection.createRange().text
        : document.getSelection();
      return t;
    }

    $("body").mouseup(function () {
      let selection = getSelectedText();
      let selection_text = selection.toString();
      const tag = selection.anchorNode.lastChild.tagName;
      console.log("selection", selection);
      if (selection_text && tag !== "INPUT" && tag !== "TEXTAREA") {
        highlight.current = highlight.current + 1;

        let mark = document.createElement("MARK");
        console.log("mark", mark);
        mark.textContent = selection_text;
        mark.className = highlight.current;
        mark.ref = highlight;
        mark.setAttribute("style", "font-size:inherit");

        let range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(mark);

        mark.onclick = () => {
          let text = mark.textContent || mark.innerText;
          let node = document.createTextNode(text);
          mark.parentNode.replaceChild(node, mark);
        };
      }
    });
  }, []);
};
