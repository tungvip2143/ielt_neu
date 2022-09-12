import { Card, Typography } from "@mui/material";

export interface Props {
  dataReading?: any;
}

const Reading = (props: Props) => {
  const { dataReading } = props;
  const detailDataReading = dataReading?.readingDetail.map((item: any) => {
    return item.groups;
  });
  const groupQuestionAnswer = detailDataReading?.map((item: any) => {
    return item.questions;
  });
  const questionAnswer = groupQuestionAnswer.map((question: any) => {
    return question;
  });
  console.log("dataReadingdetails", detailDataReading, groupQuestionAnswer);

  return (
    <Card className="mt-[10px] p-[20px]">
      <Typography sx={{ fontWeight: "bold" }}>Score: {dataReading?.score?.reading}</Typography>
      <p>
        {/* {questionAnswer?.map((item: any) => {
          return <p>{item.answer}</p>;
        })} */}
      </p>
    </Card>
  );
};
export default Reading;
