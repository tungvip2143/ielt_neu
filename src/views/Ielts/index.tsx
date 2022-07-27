import React from "react";
import { useTranslation } from "react-i18next";
import { changeLang } from "helpers/lang";
import "App.css";
import LayoutCommon from "components/LayoutCommon/LayoutCommon";
import { dataIlets } from "components/data/dataIelts";

const Ielts: React.FC = (props) => {
  //! State
  const { t } = useTranslation();

  const onChangeLanguage = (lang: string) => () => {
    changeLang(lang);
  };
  const dataLayoutCommon = {
    title: "Practice",
    sub: "Practice",
    desc: "Practice with accurate IELTS tests  to improve your score.",
    background: "rgb(255,245,247)",
    background2: "rgb(255,229,234)",
  };
  //! Render
  return (
    <div>

 {/* TODO : đặt margin theo heigh của header */}
      <div>
        <LayoutCommon data={dataLayoutCommon} exams={dataIlets} />
      </div>
    </div>
  );
};
export default Ielts;
