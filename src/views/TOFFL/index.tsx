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
  partRenderSelected?: any;
  questionSelected?: any;
  onClickPage: (id: string) => void;
}

const TOFFL = ({ partRenderSelected, questionSelected, onClickPage }: TOFFLI) => {
  // console.log(partRenderSelected.questions.group?.[0]?.index);
  const [expanded, setExpanded] = useState(questionSelected);
  const [dataPartGruop, setDataPartGroup] = useState();

  //! Number

  const from = () => {
    partRenderSelected?.questions[0]?.map((item: any) => {
      console.log("item");
    });
  };

  useEffect(() => {
    from();
  }, []);
  // const from = partRenderSelected.questions[0].index;
  // console.log(from);
  // const to = partRenderSelected.questions.group.length * 2;
  const dataNumber = {
    from: "1",
    to: "6",
    // from: partRenderSelected?.[0]?.index,
    // to: partRenderSelected?.[partRenderSelected.length - 1]?.index,
  };
  //
  const handleCollapse = (id: any) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? id : false);
    onClickPage(id);
  };

  useEffect(() => {
    setExpanded(questionSelected);
  }, [questionSelected]);
  //
  const renderPartValueGroup = (partRenderSelected: any) => {
    return Object.entries(partRenderSelected?.questions).map(([keyGoup, partGroup]: any) => {
      // console.log(keyGoup);
      // console.log(partGroup);

      return partGroup.map((item: any) => {
        return (
          <>
            <ItemQuestion key={keyGoup} question={item} expanded={expanded} onCollapse={handleCollapse} />
          </>
        );
      });
    });
  };

  //! Render
  return (
    <Box>
      <TitleExam dataNumber={dataNumber} />
      <Stack direction="column" spacing={1} sx={{ pb: "100px" }}>
        {renderPartValueGroup(partRenderSelected)}
        {/* {partRenderSelected.map((item: any) => {
          return <ItemQuestion expanded={expanded} onCollapse={handleCollapse} key={item.id} question={item} />;
        })} */}
      </Stack>
    </Box>
  );
};

export default TOFFL;
