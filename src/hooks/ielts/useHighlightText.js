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

    function clearSelection() {
      if (document.selection && document.selection.empty) {
        document.selection.empty();
      } else if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
      }
    }

    $(".exam").mouseup(function (event) {
      let selection = getSelectedText();
      let selection_text = selection.toString();
      let range = selection.getRangeAt(0);
      const docFragment = range.cloneContents();
      const input = docFragment.querySelector("input");
      const textarea = docFragment.querySelector("textarea");
      const p = docFragment.querySelector("p");
      const clickNumber = event.detail;

      // var unFocus = function () {
      //   if (document.selection) {
      //     document.selection.empty();
      //   } else {
      //     window.getSelection().removeAllRanges();
      //   }
      // };

      // if (inputTags) {
      //   inputTags.forEach((input) => {
      //     console.log("input12345", input);
      //     input.onmousemove = () => {
      //       unFocus();
      //     };
      //   });
      // }

      // $("input,textarea").bind("cut copy paste", function (e) {
      //   e.preventDefault(); //disable cut,copy,paste
      // });
      if (clickNumber < 2 && !input && !textarea && !p) {
        if (selection_text) {
          highlight.current = highlight.current + 1;

          let mark = document.createElement("MARK");
          mark.textContent = selection_text;
          mark.className = `mark-${highlight.current}`;
          mark.ref = highlight;
          mark.setAttribute("style", "font-size:inherit");
          console.log("abcd");

          range.deleteContents();
          range.insertNode(mark);

          // mark.onclick = () => {
          //   let text = mark.textContent || mark.innerText;
          //   let node = document.createTextNode(text);
          //   mark.parentNode.replaceChild(node, mark);
          // };
        }
      } else {
        clearSelection();
      }
    });
  }, []);
};
