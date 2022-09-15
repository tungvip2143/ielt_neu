import $ from "jquery";
import { useEffect, useRef } from "react";

export const useHightLightText = ({ noted, toggleNote }) => {
  const highlight = useRef(0);

  console.log("noted at highligh", noted);

  useEffect(() => {
    function getSelectedText() {
      let t = document.all
        ? document?.selection.createRange().text
        : document.getSelection();
      return t;
    }

    $("body").mouseup(function () {
      var selection = getSelectedText();
      var selection_text = selection.toString();
      highlight.current = highlight.current + 1;

      var mark = document.createElement("MARK");
      // const clear = document.querySelector(".clear");
      console.log("mark", mark);
      mark.textContent = selection_text;
      mark.className = highlight.current;
      mark.ref = highlight;

      if (selection) {
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(mark);

        mark.onclick = () => {
          const className = mark.className;
          if (noted[className]) {
            toggleNote();
            return;
          }

          var text = mark.textContent || mark.innerText;
          var node = document.createTextNode(text);
          mark.parentNode.replaceChild(node, mark);
        };
      }
    });
  }, [noted]);
};
