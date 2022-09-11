import { Card, Typography } from "@mui/material";

export interface Props {
  dataListening?: any;
}

const Listening = (props: Props) => {
  const { dataListening } = props;
  console.log("dataListening", dataListening);
  console.log("listeningDetail", dataListening.listeningDetail);

  return (
    <Card className="mt-[10px] p-[20px]">
      <Typography sx={{ fontWeight: "bold" }}>Score: {dataListening?.score?.listening}</Typography>
      {dataListening?.listeningDetail?.map((item: any, index: number) => {
        return (
          <Typography key={item.partNumber} sx={{ fontWeight: "bold" }}>
            {item?.groups?.map((el: any, index: number) => {
              return (
                <Typography key={el._id} sx={{ fontWeight: "bold" }}>
                  Score: {dataListening?.score?.listening}
                </Typography>
              );
            })}
          </Typography>
        );
      })}
    </Card>
  );
};
export default Listening;
