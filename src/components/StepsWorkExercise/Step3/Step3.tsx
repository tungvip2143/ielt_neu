import React, { useState, useEffect } from "react";
//
import { ieltsApi } from "api/ieltsResults";
//
import Text from "components/Typography/index";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//
import ItemQuestion from "../Step1/CardItem";
import TitleExam from "components/StepsWorkExercise/TitleExam/TitleExam";
// !type

const Step3 = () => {
  const [data, setData] = useState<any>([]);
  const fetch = async () => {
    const response = await ieltsApi.getIeltReadingResult();
    setData(response.data);
  };
  useEffect(() => {
    fetch();
  }, []);
  //   console.log(data.part1);
  const dataNumber = {
    from: 27,
    to: 29,
  };
  return (
    <Box>
      <TitleExam dataNumber={dataNumber} />
      <Stack direction="column" spacing={1} sx={{ pb: "100px" }}>
        {/* {data?.part3?.map((item: any) => {
          return <ItemQuestion key={item.id} question={item} />;
        })} */}
      </Stack>
    </Box>
  );
};

export default Step3;
