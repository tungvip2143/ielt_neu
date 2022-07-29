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
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { TypeExamEnum } from "constants/enum";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
//
import ReactPaginate from "react-paginate";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface EachTableI {
  panelId: TypeExamEnum;
}

const EachTable = ({ panelId }: EachTableI) => {
  //! State
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  console.log(data);
  //! Function
  const limit = 5;
  const currentPage = Math.ceil(10 / 5);
  useEffect(() => {
    const fetchData = async () => {
      let endpoint = "users";
      // if (panelId === TypeExamEnum.READING) {
      //   endpoint = "posts";
      // }

      try {
        setLoading(true);
        const res = await httpServices.get(`https://jsonplaceholder.typicode.com/${endpoint}?_page=1&_limit=${limit}`);
        setData(res.data);
        setLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [panelId]);
  //
  const [page, setPage] = useState(1);
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };
  //! Render
  const renderIconByPanel = () => {
    if (panelId === TypeExamEnum.LISTENING) {
      return <HeadphonesIcon sx={{ color: "red" }} />;
    }

    if (panelId === TypeExamEnum.READING) {
      return <AutoStoriesIcon sx={{ color: "#B0D909" }} />;
    }
    if (panelId === TypeExamEnum.WRITTING) {
      return <CreateIcon sx={{ color: "#8CE5EC" }} />;
    }
    if (panelId === TypeExamEnum.SPEAKING) {
      return <KeyboardVoiceIcon sx={{ color: "#FF9700" }} />;
    }

    return <HeadphonesIcon sx={{ color: "red" }} />;
  };
  // ! pagination
  const fetchComments = async (currentPage: any) => {
    const res = await httpServices.get(
      `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${limit}`
    );
    return res.data;
  };
  //
  const handlePageClick = async (data: any) => {
    console.log(data.selected);

    const currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setData(commentsFormServer);
  };
  //
  const tbRow = {
    borderTop: "1.5px solid #eeeeee",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
    },
  };

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
          <TableHead sx={{ background: "#fff", borderTop: "1px solid #eeeeee", color: "#B8BCC0 " }}>
            <TableRow>
              <TableCell
                sx={{
                  color: "#B8BCC0 !important",
                  width: "150px",
                  textTransform: "capitalize !important",
                  fontWeight: "500 !important",
                }}
                align="center"
              >
                Section
              </TableCell>
              <TableCell
                sx={{
                  color: "#B8BCC0 !important",
                  width: "120px",
                  textTransform: "capitalize !important",
                  fontWeight: "500 !important",
                }}
                size="small"
              >
                Band Score
              </TableCell>
              <TableCell
                sx={{
                  color: "#B8BCC0 !important",
                  textTransform: "capitalize !important",
                  fontWeight: "500 !important",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#B8BCC0 !important",
                  textTransform: "capitalize !important",
                  fontWeight: "500 !important",
                }}
                size="small"
                align="center"
              >
                Session Date
              </TableCell>
              <TableCell sx={{ color: "#B8BCC0 !important" }} size="small" align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <CircularProgress />
            ) : (
              data.map((item: any) => (
                <TableRow key={item.id} sx={tbRow}>
                  <TableCell component="th" align="center">
                    {renderIconByPanel()}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      align="center"
                      sx={{ fontWeight: "bold", display: "inline", fontSize: "20px", color: "#36373B" }}
                    >
                      0/
                    </Typography>
                    <Typography sx={{ color: "#B8BCC0 ", display: "inline", fontSize: "20px" }}>9</Typography>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#36373B" }}>Section Test #2</TableCell>
                  <TableCell sx={{ color: "#B8BCC0 " }} align="center">
                    28 Jul 2022, 06:32
                  </TableCell>
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
        <Box sx={{ display: "flex", justifyContent: "center", p: "30px 0", borderTop: "1px solid #eeeeee" }}>
          <ReactPaginate
            previousLabel={<KeyboardArrowLeftIcon />}
            nextLabel={<ChevronRightIcon />}
            breakLabel={"..."}
            pageCount={currentPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link-icon"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link-icon"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default EachTable;
