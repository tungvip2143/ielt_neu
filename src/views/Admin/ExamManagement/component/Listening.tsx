import { Card, Typography } from "@mui/material";

export interface Props {
  dataListening?: any;
}

const Listening = (props: Props) => {
  const { dataListening } = props;
  console.log("dataListening", dataListening);

  return (
    <Card className="mt-[10px] p-[20px]">
      <Typography sx={{ fontWeight: "bold" }}>Score: {dataListening?.score?.listening}</Typography>
    </Card>
  );
};
export default Listening;
