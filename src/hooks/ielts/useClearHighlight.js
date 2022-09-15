import { useEffect } from "react";
import ReactDOM from "react-dom";

export const useClearHighLlight = () => {
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      const domNode = ReactDOM.findDOMNode(e.target);
      const tagName = domNode?.tagName;
      const textInnerTag = domNode.innerText;

      // const textScanned = data.view.getSelection().toString();
    });

    // function getSelectedText() {
    //   let t = document.all
    //     ? document?.selection.createRange().text
    //     : document.getSelection();
    //   return t;
    // }
  }, []);

  const clearHighlight = () => {
    const selection = document.getSelection();
    console.log("selection", selection);
  };

  return { clearHighlight };
};
