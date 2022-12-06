import $ from "jquery";
import { useEffect, useRef } from "react";

export const useHightLightText = () => {
  const highlight = useRef(0);

  const onHighlightText = (selectioned) => {
    function clearSelection() {
      if (document.selection && document.selection.empty) {
        document.selection.empty();
      } else if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
      }
    }

    // $(".exam").mouseup(function (event) {
    let selection_text = selectioned.toString();

    let range = selectioned.getRangeAt(0);
    // // disable highligh inside input
    // const noselect = selection.anchorNode?.className === "noselect";
    const docFragment = range.cloneContents();
    const input = docFragment.querySelector("input");
    const textarea = docFragment.querySelector("textarea");
    const p = docFragment.querySelector("p");
    const span = docFragment.querySelector("span");
    const clickNumber = event.detail;

    // $("input,textarea").bind("cut copy paste", function (e) {
    //   e.preventDefault(); //disable cut,copy,paste
    // });
    // if (clickNumber < 2 && !input && !textarea && !p && !span && !noselect) {
    if (selection_text) {
      highlight.current = highlight.current + 1;

      let mark = document.createElement("MARK");
      mark.textContent = selection_text;
      mark.className = `mark-${highlight.current}`;
      mark.ref = highlight;
      mark.setAttribute("style", "font-size:inherit");

      range.deleteContents();
      range.insertNode(mark);

      console.log("mark", mark);

      // mark.onclick = () => {
      //   let text = mark.textContent || mark.innerText;
      //   let node = document.createTextNode(text);
      //   mark.parentNode.replaceChild(node, mark);
      // };
    }
    // } else {
    //   // clearSelection();
    // }
    // });
  };
  return {
    onHighlightText,
  };
};
