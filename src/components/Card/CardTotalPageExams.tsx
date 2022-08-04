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

const CardTotalPageExams = ({ questions, onClickPart, onClickPage, questionSelected }: CardTotalPageExamsI) => {
  console.log("questionSelected", questionSelected);
  const [highlightPage, setHighlightPage] = useState(questionSelected);
  useEffect(() => {
    setHighlightPage(questionSelected);
  }, [questionSelected]);
  //! State
  const classes = useStyles();
  //

  //! Effect

  //! Render
  return (
    <Box sx={box}>
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ width: { md: "80%", display: "flex", flexWrap: "wrap" } }}>
            {Object.entries(questions).map(([partKey, partValues]: any, index) => {
              console.log("partKey", partKey);
              // console.log("partValues", partValues);

              return (
                <div key={partKey} className={classes.eachItem} onClick={() => onClickPart(partKey)}>
                  <div className={classes.part}>Part: {index + 1}</div>
                  <Stack direction="row" spacing={0.5} sx={{ ml: "10px" }}>
                    {(partValues || []).map((value: any) => {
                      console.log("value", value);
                      const handleHighLightPage = () => {
                        setHighlightPage(questionSelected);
                        onClickPage(value.id);
                      };
                      return (
                        <div
                          key={value.id}
                          className={classes.eachQuestion}
                          onClick={handleHighLightPage}
                          style={highlightPage === value.id ? { background: "#2196F3", borderRadius: "50%" } : {}}
                        >
                          {value.index}
                        </div>
                      );
                    })}
                  </Stack>
                </div>
              );
            })}
          </Box>

          <Box sx={{ width: { md: "20%" } }}>
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#333",
                  p: "8px",
                  borderRadius: "5px",
                }}
              >
                <KeyboardArrowLeftIcon sx={{ color: "#fff", fontSize: "24px" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#333",
                  p: "8px",
                  borderRadius: "5px",
                }}
              >
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
