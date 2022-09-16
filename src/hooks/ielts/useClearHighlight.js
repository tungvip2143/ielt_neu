import $ from "jquery";
import { useEffect } from "react";

export const useClearHighlight = () => {
  const clearAll = () => {
    const tags = document.querySelectorAll("mark");
    if (tags) {
      tags.forEach((mark) => {
        let text = mark.textContent || mark.innerText;
        let node = document.createTextNode(text);
        mark.parentNode.replaceChild(node, mark);
      });
    }
  };
  return { clearAll };
};
