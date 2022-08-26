import { Button, Card, Typography } from "@mui/material";
import ButtonCommon from "components/Button/ButtonCommon";
import CommonDataGrid from "components/CommonDataGrid";
import useExamManagement from "hooks/examManagement/useExamManagement";
import { useState } from "react";
import CommonActionMenu from "components/CommonActionMenu";
import { Link } from "react-router-dom";
import ButtonUpload from "components/Button/ButtonUpload";
import AddIcon from "@mui/icons-material/Add";
import { RouteBase } from "constants/routeUrl";

const styles = {
  titleTable: {
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonOpenModal: {
    borderRadius: 20,
    background: "#7C89CC",
  },
};

const DataFake = [
  {
    id: 1,
    contest: "ielts test 1",
    startDate: "22-07-2022",
    endDate: "01-08-2022",
  },
  {
    id: 2,
    contest: "ielts test 2",
    startDate: "22-07-2022",
    endDate: "01-08-2022",
  },
];
const ContestManagement = () => {
  // const [dataExam, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useExamManagement();

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        <Link to={RouteBase.CreateContestManagement}>
          <ButtonUpload
            titleButton="Create contest"
            icon={<AddIcon />}
            onClick={() => {}}
            style={{ background: "#9155FE" }}
          />
        </Link>
      </div>

      <Card>
        <CommonDataGrid
          columns={[
            {
              flex: 1,
              field: "contest",
              renderHeader: () => <Typography style={styles.titleTable}>Contest</Typography>,
            },
            {
              flex: 1,
              field: "startDate",
              renderHeader: () => <Typography style={styles.titleTable}>Start date</Typography>,
            },
            {
              flex: 1,
              field: "endDate",
              renderHeader: () => <Typography style={styles.titleTable}>End date</Typography>,
            },
            {
              flex: 0.3,
              field: "action",
              filterable: false,
              hideSortIcons: true,
              disableColumnMenu: true,
              renderHeader: () => <Typography style={styles.titleTable}>Action</Typography>,
              renderCell: (items: any) => {
                return <CommonActionMenu onEdit={() => {}} onSubmitRemove={() => {}} row={items} />;
              },
            },
          ]}
          // pagination={{
          //   page: metaPart?.page,
          //   pageSize: metaPart?.pageSize,
          //   totalRow: metaPart?.totalRow,
          // }}
          // loading={loading}
          checkboxSelection
          rows={DataFake}
          // onPageChange={onPageChange}
          // onPageSizeChange={onPageSizeChange}
        />
      </Card>
    </div>
  );
};

export default ContestManagement;
