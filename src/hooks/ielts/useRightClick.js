import { boolean } from "yup";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

export const useRightClick = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAction, setIsAction] = useState(false);
  const [className, setClassName] = useState("");

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

  const handleRightClick = (e) => {
    const domNode = ReactDOM.findDOMNode(e.target);
    const tagName = domNode?.tagName;
    const className = domNode.getAttribute("class");

    $(".exam").mouseup(function (event) {
      let selection = getSelectedText();
      let selection_text = selection.toString();
      let range = selection.getRangeAt(0);
      const docFragment = range.cloneContents();
      const input = docFragment.querySelector("input");
      const textarea = docFragment.querySelector("textarea");
      const p = docFragment.querySelector("p");
      const clickNumber = event.detail;

      console.log("abcdef");

      // $("input,textarea").bind("cut copy paste", function (e) {
      //   e.preventDefault(); //disable cut,copy,paste
      // });
      if (!input && !textarea && !p) {
        if (selection_text) {
          setIsAction(true);
          setClassName(className);
          e?.preventDefault();

          const x = e.pageX;
          const y = e.pageY;

          setPosition({ x, y });
        }
      } else {
        clearSelection();
      }
    });

    // if (tagName === "MARK") {
    //   setIsAction(true);
    //   setClassName(className);
    //   e?.preventDefault();

    //   const x = e.pageX;
    //   const y = e.pageY;

    //   setPosition({ x, y });
    // }
  };

  const toggleAction = () => {
    setIsAction((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => handleRightClick(e));
  }, []);

  return { isAction, position, toggleAction, className };
};
