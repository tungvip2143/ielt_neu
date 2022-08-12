//
import Box from "@mui/material/Box";
//
import CardPart from "components/Card/CardPart";
//
import Step2ExamContent from "components/Exams/components/Step2ExamContent/Step2ExamContent";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { ACTION } from "interfaces/testType";
// import ButtonNumberPage from "components/Button/ButtonNumberPage";

interface Props {
  data: any;
  test?: string;
}

const ExamTest = (props: Props) => {
  const { data, ...rest } = props;
  const [part, setPart] = useState(data);

  return (
    <Box>
      <Step2ExamContent action={ACTION.TEST} data={data} {...rest} />
    </Box>
  );
};

export default ExamTest;
