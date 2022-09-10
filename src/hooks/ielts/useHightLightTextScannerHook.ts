import { useState } from "react";
export const useHightLightText = (text: string) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isScanner, setIsScanner] = useState(false);
  const [textScanner, setTextScanner] = useState("");
  const [newPassage, setNewPassage] = useState(text);

  const handleRightClick = (e: any) => {
    setIsScanner(true);
    e?.preventDefault();

    const x = e.pageX;
    const y = e.pageY;

    setPosition({ x, y });
  };
  // const selection =

  const onScannerText = (data: any) => {
    document.addEventListener("contextmenu", (e) => handleRightClick(e));
    const textScanned = data.view.getSelection().toString();
    setTextScanner(textScanned);
  };

  const newText = () => {
    const marked = `<mark>${textScanner}</mark>`;
    return text.replace(textScanner, marked);
  };

  const onHightlight = () => {
    const passage = newText();
    setNewPassage(passage);
  };

  return { onScannerText, onHightlight, newPassage, position, isScanner };
};
