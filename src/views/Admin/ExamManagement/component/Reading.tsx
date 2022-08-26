import { Card, Typography } from "@mui/material";

export interface Props {
  dataReading?: any;
}

const Reading = (props: Props) => {
  const { dataReading } = props;
  console.log("dataReading", dataReading);

  return (
    <Card className="mt-[10px] p-[20px]">
      {dataReading.score.total && <Typography sx={{ fontWeight: "bold" }}>Score: {dataReading.score.total}</Typography>}
    </Card>
  );
};
export default Reading;
