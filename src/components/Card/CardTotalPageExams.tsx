import React, { useState, useMemo, useEffect } from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import CardNumberPage from "./CardNumberPage";
//
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
//
import { ieltsApi } from "api/ieltsResults";
import { makeStyles } from "@mui/styles";
import ButtonCommon from "components/Button/ButtonCommon";
import { object } from "yup";

interface CardTotalPageExamsI {
  questions: any;
  onClickPage: (id: string) => void;
  onClickPart: (id: string) => void;
  questionSelected?: string;
}

const box = {
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  transform: "translateY(-100px)",
  p: "10px 0px",
};

const useStyles = makeStyles((theme) => {
  return {
    eachItem: {
      display: "flex",
      width: "34%",
      paddingBottom: "10px",
    },
    part: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#000000",
      marginRight: "15px",
      textTransform: "capitalize",
    },
    eachQuestion: {
      background: "#333",
      color: "#fff",
      width: "24px",
      height: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };
});
const nextPage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#333",
  p: "8px",
  borderRadius: "5px",
};
const CardTotalPageExams = ({ questions, onClickPart, onClickPage, questionSelected }: CardTotalPageExamsI) => {
  // console.log("questionSelected", questionSelected);
  // console.log("questions", questions);

  const [highlightPage, setHighlightPage] = useState();

  //! State
  const classes = useStyles();

  //
  const renderPartValues = (partValues: any) => {
    return Object.entries(partValues?.questions).map(([keyGoup, partGroup]: any) => {
      return partGroup.map((item: any) => {
        const handleClickQuestion = () => {
          onClickPage(item.id);
          setHighlightPage(item.id);
        };
        return (
          <div
            key={keyGoup}
            className={classes.eachQuestion}
            onClick={handleClickQuestion}
            style={highlightPage === item.id ? { background: "#4C80F1", borderRadius: "50%" } : {}}
          >
            <span>{item.id}</span>
          </div>
        );
      });
    });
  };
  //! Effect

  //! Render
  return (
    <Box sx={box}>
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ width: { md: "80%", display: "flex", flexWrap: "wrap" } }}>
            {Object.entries(questions).map(([partKey, partValues]: any, index) => {
              // console.log("partKey", partKey);
              // console.log("partValues", partValues);
              return (
                <>
                  <div key={partKey} className={classes.eachItem} onClick={() => onClickPart(partKey)}>
                    <div className={classes.part}>{partKey}</div>
                    <Stack direction="row" spacing={0.5}>
                      {renderPartValues(partValues)}
                    </Stack>
                  </div>
                </>
              );
            })}
          </Box>

          <Box sx={{ width: { md: "20%" } }}>
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end" }}>
              <Box sx={nextPage}>
                <KeyboardArrowLeftIcon sx={{ color: "#fff", fontSize: "24px" }} />
              </Box>
              <Box sx={nextPage}>
                <KeyboardArrowRightIcon sx={{ color: "#fff", fontSize: "24px" }} />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardTotalPageExams;
