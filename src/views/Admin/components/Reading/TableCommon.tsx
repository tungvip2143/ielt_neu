import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useGetListReadingQuestion from "hooks/Reading/useGetListReadingQuestion";
import { ReadingQuestionResponse } from "interfaces/questionInterface";

const TableCommon = () => {
  const TitleTable = ["STT", "Question", "Correct answer", "Level"];
  const [dataReading] = useGetListReadingQuestion();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {TitleTable.map((row: string, index: number) => (
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(dataReading?.data?.data || []).map((el: ReadingQuestionResponse, index: number) => {
            return (
              <TableRow>
                <TableCell>{++index}</TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: el?.questionText || "" }}></div>
                </TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: el?.answer || "" }}></div>
                </TableCell>
                <TableCell>{el.level}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCommon;
