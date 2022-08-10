import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { TypeExamEnum } from "constants/enum";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//
import LoadingPage from "components/Loading";
import { format } from "date-fns";
import { useIeltsResult } from "hooks/ielts/useIelts";
import Pagination from "components/Pagination";
import useSagaCreators from "hooks/useSagaCreators";
import { IeltsActions } from "redux/creators/modules/ielts";
import { themeCssSx } from "../../../ThemeCssSx/ThemeCssSx";
//
const tbRow = {
  borderTop: "1.5px solid #eeeeee",
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
  },
};
const buttonReview = {
  color: "red",
  border: "1px solid red",
  "&:hover": { border: "1px solid red", background: "#fff" },
};

interface EachTableI {
  panelId: TypeExamEnum;
}

const EachTable = ({ panelId }: EachTableI) => {
  //! State
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const { dispatch } = useSagaCreators();
  const { data, isLoading, refetch } = useIeltsResult({ skill: panelId, page });
  const history = useHistory();
  // !Effect
  useEffect(() => {
    setResults(data?.data?.data?.data);
  }, [isLoading, page]);
  useEffect(() => {
    refetch();
  }, [page]);

  //! Function
  const handleReview = (testCode: number) => {
    dispatch(IeltsActions.saveTestCode, { testCode });
    history.push("/ielts/review/reading");
  };

  //! Render
  const renderIconByPanel = () => {
    if (panelId === TypeExamEnum.LISTENING) {
      return <HeadphonesIcon sx={{ color: themeCssSx.colorIcons.listening }} />;
    }

    if (panelId === TypeExamEnum.READING) {
      return <AutoStoriesIcon sx={{ color: themeCssSx.colorIcons.reading }} />;
    }
    if (panelId === TypeExamEnum.WRITING) {
      return <CreateIcon sx={{ color: themeCssSx.colorIcons.writing }} />;
    }
    if (panelId === TypeExamEnum.SPEAKING) {
      return <KeyboardVoiceIcon sx={{ color: themeCssSx.colorIcons.speaking }} />;
    }

    return <HeadphonesIcon sx={{ color: "red" }} />;
  };

  //! Pagination
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  // !CSS
  const container = {
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  };
  const tableCellCommon = {
    color: "#B8BCC0 !important",
    textTransform: "capitalize !important",
    fontWeight: "500 !important",
    fontSize: "14px !important",
  };
  const tableCellSection = {
    width: "150px",
    pl: "44px !important",
    ...tableCellCommon,
  };
  const tableCellBandCore = {
    width: "120px",
    ...tableCellCommon,
  };
  const tableCellName = {
    width: "300px !important",
    ...tableCellCommon,
  };
  const tableCellReview = {
    color: "#B8BCC0 !important",
    pr: "44px",
  };
  const tableBodyIcon = {
    pl: "44px",
  };
  const bandScoceLeft = {
    fontWeight: "bold",
    display: "inline",
    fontSize: "20px",
    color: themeCssSx.color.desc.common,
  };
  const bandScoceRight = {
    color: "#8A8C91 ",
    display: "inline",
    fontSize: "20px",
  };
  const name = {
    fontWeight: "bold",
    color: themeCssSx.color.desc.common,
  };
  const date = {
    color: themeCssSx.color.title.titleTableHead,
  };
  const review = {
    pr: "44px",
  };
  const containerPagination = {
    display: "flex",
    justifyContent: "center",
    p: "30px 0",
    borderTop: "1px solid #eeeeee",
  };
  const tableHead = {
    background: "#fff",
    borderTop: "1px solid #eeeeee",
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper} sx={container}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={tableHead}>
            <TableRow>
              <TableCell sx={tableCellSection}>Section</TableCell>
              <TableCell sx={tableCellBandCore} size="small">
                Band Score
              </TableCell>
              <TableCell sx={tableCellName}>Name</TableCell>
              <TableCell sx={tableCellCommon} size="small" align="center">
                Session Date
              </TableCell>
              <TableCell sx={tableCellReview} size="small"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.map((item: any) => (
              <TableRow key={item.id} sx={tbRow}>
                <TableCell sx={tableBodyIcon} component="th">
                  {renderIconByPanel()}
                </TableCell>
                <TableCell>
                  <Typography align="center" sx={bandScoceLeft}></Typography>
                  <Typography sx={bandScoceRight}>
                    {panelId === TypeExamEnum.READING && item.score.reading}
                    {panelId === TypeExamEnum.WRITING && item.score.writing}
                    {panelId === TypeExamEnum.LISTENING && item.score.listening}
                    {panelId === TypeExamEnum.SPEAKING && item.score.speaking}
                  </Typography>
                </TableCell>
                <TableCell sx={name}>{item.testCode}</TableCell>
                <TableCell sx={date} align="center">
                  {format(new Date(item.finishedDate), "dd-MM-yyyy")}
                </TableCell>
                <TableCell sx={review} align="right">
                  <Button variant="outlined" sx={buttonReview} onClick={() => handleReview(item.testCode)}>
                    REVIEW
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={containerPagination}>
          <Pagination totalPage={data?.data?.data?.paging?.totalPage} onChangePage={handleChangePage} page={page} />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default EachTable;
