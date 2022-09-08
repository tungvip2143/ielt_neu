import { Button, Card, Typography } from "@mui/material";
import ButtonCommon from "components/Button/ButtonCommon";
import CommonDataGrid from "components/CommonDataGrid";
import LoadingCircular from "components/CommonStyles/LoadingCircular/LoadingCircular";
import { RouteBase } from "constants/routeUrl";
import useExamManagement from "hooks/examManagement/useExamManagement";
import { isEmpty } from "lodash";
import moment from "moment";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ViewExam from "./component/ViewExam";

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
  const history = useHistory();
  const [dataExam, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useExamManagement();

  const rows = dataExam?.map((el: any) => ({
    id: el?.id,
    fullname: el?.userDetail?.fullname,
    email: el?.userDetail?.email,
    finishedDate: moment(el?.finishedDate).format("DD-MM-YYYY"),
    status: el?.status,
  }));

  const [openModal, setOpenModal] = useState({});

  return (
    <>
      {loading ? (
        <LoadingCircular />
      ) : (
        <Card>
          <CommonDataGrid
            columns={[
              {
                flex: 1,
                field: "fullname",
                renderHeader: () => <Typography style={styles.titleTable}>Full name</Typography>,
              },
              {
                flex: 1,
                field: "email",
                renderHeader: () => <Typography style={styles.titleTable}>Email</Typography>,
              },
              {
                flex: 0.7,
                field: "exam",
                renderHeader: () => <Typography style={styles.titleTable}>View exam</Typography>,
                renderCell: (items: any) => {
                  return (
                    <Button
                      variant="contained"
                      style={styles.buttonOpenModal}
                      onClick={() =>
                        history.push({
                          pathname: RouteBase.ViewExamId(items?.row?.email),
                          search: `?id=${items?.id}`,
                        })
                      }
                    >
                      View exam
                    </Button>
                  );
                },
              },
              {
                flex: 1,
                field: "finishedDate",
                renderHeader: () => <Typography style={styles.titleTable}>Finished date</Typography>,
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
            rows={rows}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </Card>
      )}
    </>
  );
};

export default ExamManagement;
