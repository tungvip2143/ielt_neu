import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import httpServices from "services/httpServices";
import CircularProgress from "@mui/material/CircularProgress";

interface EachTableI {
  panelId: number;
}

const EachTable = ({ panelId }: EachTableI) => {
  //! State
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //! Function
  useEffect(() => {
    const fetchData = async () => {
      let endpoint = "users";
      if (panelId === 2) {
        endpoint = "posts";
      }

      try {
        setLoading(true);
        const res = await httpServices.get(`https://jsonplaceholder.typicode.com/${endpoint}`);
        setData(res.data);
        setLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [panelId]);

  //! Render
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer
        component={Paper}
        sx={{
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#fff", borderTop: "1px solid #eeeeee" }}>
            <TableRow>
              <TableCell>Section</TableCell>
              <TableCell size="small" align="center">
                Band Score
              </TableCell>
              <TableCell size="small" align="center">
                Name
              </TableCell>
              <TableCell size="small" align="center">
                Session Date
              </TableCell>
              <TableCell size="small" align="center">
                Review
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <CircularProgress />
            ) : (
              data.map((item: any) => (
                <TableRow key={item.id} sx={{ borderTop: "1.5px solid #eeeeee" }}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="center">{item.username}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" sx={{ color: "red", border: "1px solid red" }}>
                      REVIEW
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EachTable;
