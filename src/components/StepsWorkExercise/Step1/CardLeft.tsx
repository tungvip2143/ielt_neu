import React, { useEffect } from "react";
//

import Text from "components/Typography/index";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ReactHtmlParser, { convertNodeToElement, processNodes } from "react-html-parser";
import { Debug } from "components/Formik/FormikDebug";
import { makeStyles } from "@mui/styles";
import { IELT_TEST } from "interfaces/testType";
import { decode } from "html-entities";

// !type

interface Props {
  dataChangePart: any;
  test?: string;
}

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
  },
  img: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
}));

const CardLeft = ({ dataChangePart, test }: Props) => {
  console.log("content-p2", dataChangePart);
  const classes = useStyles();

  return (
    <>
      {test === IELT_TEST.READING && (
        <div dangerouslySetInnerHTML={{ __html: decode(dataChangePart?.passageText) || "" }}></div>
        // <div>{ReactHtmlParser(ReactHtmlParser(dataChangePart?.passageText))}</div>
      )}
      {test === IELT_TEST.WRITING && (
        <div className={classes.container}>
          <span>
            <strong>{ReactHtmlParser(dataChangePart?.question?.title)}</strong>
          </span>
          <Text.Desc16>{ReactHtmlParser(dataChangePart?.question?.text)}</Text.Desc16>
          <div className={classes.div}>
            <img
              className={classes.img}
              src={dataChangePart?.question?.image}
              alt={`writing part ${dataChangePart?.question?.displayNumber}`}
            />
          </div>
        </div>
      )}
      {/* <Debug /> */}
    </>
  );
};

export default CardLeft;
