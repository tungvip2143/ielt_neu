import { Card, Typography } from "@mui/material";

export interface Props {
  dataReading?: any;
}

const Reading = (props: Props) => {
  const { dataReading } = props;
  console.log("dataReadingdetails", dataReading);

  return (
    <Card className="mt-[10px] p-[20px]">
      <Typography sx={{ fontWeight: "bold" }}>Score: {dataReading?.score?.reading || 0}</Typography>
      <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>Reading Part Exam</Typography>
      <p>
        {(dataReading?.readingDetail || []).map((e: any, index: number) => {
          console.log("la;ksd", e);
          return (
            <>
              <div>
                <div className="text-center mb-2 mt-3">
                  Part {index + 1}:
                  <span className="ml-3 font-bold" dangerouslySetInnerHTML={{ __html: e?.passageTitle }} />
                </div>
              </div>{" "}
              {(e?.groups || []).map((group: any, index: number) => {
                return (
                  <>
                    <div style={{ textTransform: "capitalize" }}>
                      <p style={{ fontWeight: "bold" }}>
                        Type of question:{" "}
                        <span style={{ fontWeight: "normal" }}>{group.questionType.replace("_", " ")}</span>
                      </p>
                    </div>
                    {(group?.questions || []).map((question: any) => {
                      return (
                        <>
                          <div className="flex justify-between ml-5 mr-5">
                            <p className="text-red-600 capitalize">
                              Your Answer: {question?.studentAnswer === null ? "X" : question?.studentAnswer}
                            </p>
                            <span className="text-black">
                              Correct Answer: <span className="text-green-600">{question?.question?.answer}</span>
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </>
                );
              })}
            </>
          );
          // return e.directionText;
        })}
        {/* {questionAnswer?.map((item: any) => {
          return <p>{item.answer}</p>;
        })} */}
      </p>
    </Card>
  );
};
export default Reading;
