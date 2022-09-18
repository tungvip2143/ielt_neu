import { boolean } from "yup";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const useRightClick = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAction, setIsAction] = useState<boolean>(false);
  const [className, setClassName] = useState("");

  const handleRightClick = (e: any) => {
    const domNode: any = ReactDOM.findDOMNode(e.target);
    const tagName = domNode?.tagName;
    const className = domNode.getAttribute("class");
    if (tagName === "MARK") {
      setIsAction(true);
      setClassName(className);
      e?.preventDefault();

      const x = e.pageX;
      const y = e.pageY;

      setPosition({ x, y });
    }
  };

  const toggleAction = () => {
    setIsAction((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => handleRightClick(e));
  }, []);

  return { isAction, position, toggleAction, className };
};
