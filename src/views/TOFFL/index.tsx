import React, { useState, useEffect } from "react";
//
import { ieltsApi } from "api/ieltsResults";
//
import Text from "components/Typography/index";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//
import ItemQuestion from "components/StepsWorkExercise/Step1/CardItem";
import TitleExam from "components/StepsWorkExercise/TitleExam/TitleExam";
//
// !type
interface TOFFLI {
  partRenderSelected: any;
  questionSelected: any;
  onClickPage: (id: string) => void;
}

const TOFFL = ({ partRenderSelected, questionSelected, onClickPage }: TOFFLI) => {
  const [expanded, setExpanded] = useState(questionSelected);

  //! Number
  const dataNumber = {
    from: partRenderSelected?.[0]?.index,
    to: partRenderSelected?.[partRenderSelected.length - 1]?.index,
  };

  const handleCollapse = (id: any) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? id : false);
    onClickPage(id);
  };

  useEffect(() => {
    setExpanded(questionSelected);
  }, [questionSelected]);

  //! Render
  return (
    <Box>
      <TitleExam dataNumber={dataNumber} />
      <Stack direction="column" spacing={1} sx={{ pb: "100px" }}>
        {partRenderSelected.map((item: any) => {
          return <ItemQuestion expanded={expanded} onCollapse={handleCollapse} key={item.id} question={item} />;
        })}
      </Stack>
    </Box>
  );
};

export default TOFFL;
