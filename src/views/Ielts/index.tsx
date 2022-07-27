import React from "react";
import { useTranslation } from "react-i18next";
import { changeLang } from "helpers/lang";
import "App.css";
//

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
      {/* <span>Example multiple lang (i18n)</span>
      <h4>{t("shared:hello")}</h4>
      <div>
        <button onClick={onChangeLanguage("vi")}>Vi lang</button>
        <button onClick={onChangeLanguage("en")}>Eng lang</button>
      </div>
      <div style={{ padding: "100px 50px" }} className="">
        <ButtonOutLineCommon>quang test</ButtonOutLineCommon>
        <ButtonFullBg>quangtest</ButtonFullBg>
      </div>
      <div style={{ padding: "20px 50px" }} className="">
        <ButtonLarge>FREE TOEFL TEST</ButtonLarge>
        <ButtonLargeRed>FREE IELTS TEST</ButtonLargeRed>
      </div>
      <div style={{ padding: "20px 50px" }} className="">
        <ButtonBuyNow>buy now</ButtonBuyNow>
      </div>
      <div className="mt-20">
        <Title>Title</Title>
        <TitleSecond>TitleSecond</TitleSecond>
        <DescSmall>DescSmall</DescSmall>
        <TextMediumLarge>Text Medium Large</TextMediumLarge>
        <TextMedium>Text Medium.</TextMedium>
        <TextMediumBold>TextMediumBold</TextMediumBold>
        <TextSmall>Text Small </TextSmall>
        <TextSmallMedium>TextSmallMedium</TextSmallMedium>
      </div> */}

      {/* TODO : đặt margin theo heigh của header */}
      <div>
        <LayoutCommon data={dataLayoutCommon} exams={dataIlets} />
      </div>
    </div>
  );
};
export default Ielts;
