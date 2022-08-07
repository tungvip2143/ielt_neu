import React from "react";
import ReactHtmlParser from "react-html-parser";
// import Handlebars from "handlebars";
type Props = {
  data?: any;
};

// Handlebars.registerHelper("blank", function (blankId: any) {
//   return new Handlebars.SafeString(`<input id="input-${blankId}" type="text" value="" maxlength="30">`);
// });

const SentenceCompletetion = (props: Props) => {
  const { data } = props;
  console.log("sentence data", data);
  return <div>{ReactHtmlParser(data?.question?.questionText)}</div>;
};

export default SentenceCompletetion;
