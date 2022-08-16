import { Button, Card, Typography } from "@mui/material";
import ButtonCommon from "components/Button/ButtonCommon";
import CommonDataGrid from "components/CommonDataGrid";
import useExamManagement from "hooks/examManagement/useExamManagement";
import { useState } from "react";
import ModalViewExam from "./component/ModalViewExam";

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
const ExamManagement = () => {
  const [dataExam, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useExamManagement();

  const [openModal, setOpenModal] = useState(false);

  return (
    <Card>
      <CommonDataGrid
        columns={[
          {
            flex: 1,
            field: "user",
            renderHeader: () => <Typography style={styles.titleTable}>User</Typography>,
          },
          {
            flex: 0.7,
            field: "exam",
            renderHeader: () => <Typography style={styles.titleTable}>View exam</Typography>,
            renderCell: () => (
              <Button variant="contained" style={styles.buttonOpenModal} onClick={() => setOpenModal(true)}>
                View exam
              </Button>
            ),
          },
          {
            flex: 1,
            field: "dueDate",
            renderHeader: () => <Typography style={styles.titleTable}>Due date</Typography>,
          },
          {
            flex: 1,
            field: "status",
            renderHeader: () => <Typography style={styles.titleTable}>Status</Typography>,
          },
        ]}
        checkboxSelection={false}
        pagination={{
          page: metaPart?.page,
          pageSize: metaPart?.pageSize,
          totalRow: metaPart?.totalRow,
        }}
        loading={loading}
        rows={dataExam}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
      <ModalViewExam open={openModal} onCloseModal={() => setOpenModal(false)} />
    </Card>
  );
};

export default ExamManagement;
