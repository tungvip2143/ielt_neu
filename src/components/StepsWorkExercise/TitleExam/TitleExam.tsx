import React from "react";
//
import Text from "components/Typography/index";
// !type
interface Props {
  dataNumber: {
    from: number;
    to: number;
  };
}

const TitleExam = ({ dataNumber }: Props) => {
  return (
    <>
      <Text.Desc16 sx={{ fontSize: "18px !important", fontWeight: "bold", mb: "20px" }}>
        Question {dataNumber.from}-{dataNumber.to}
      </Text.Desc16>
      <Text.Desc16 sx={{ mb: "20px" }}>Choose A,B,C,D answer</Text.Desc16>
    </>
  );
};

export default TitleExam;
