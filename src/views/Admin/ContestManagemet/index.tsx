import { Button, Card, Typography } from "@mui/material";
import ButtonCommon from "components/Button/ButtonCommon";
import CommonDataGrid from "components/CommonDataGrid";
import { useState } from "react";
import CommonActionMenu from "components/CommonActionMenu";
import { Link, useHistory } from "react-router-dom";
import ButtonUpload from "components/Button/ButtonUpload";
import AddIcon from "@mui/icons-material/Add";
import { RouteBase } from "constants/routeUrl";
import useContestManagemet from "hooks/ContestManagemet/useContestManagemet";
import contestService from "services/contestService";

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

const ContestManagement = () => {
<<<<<<< HEAD
  //! State
  const [dataContest, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] =
    useContestManagemet();
  const history = useHistory();
  const onDeletePart = async (item: any) => {
    try {
      await contestService.deletePart(item?.id);
      refetchDataTable();
    } catch (error) {
      console.log("error");
    }
  };
=======
  // const [dataExam, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useExamManagement();

>>>>>>> 49319c653e2709a36d035d8e81d1b82bd9e7a3ee
  const [openModal, setOpenModal] = useState(false);
  //! Render
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
              field: "name",
              renderHeader: () => <Typography style={styles.titleTable}>Name Contest</Typography>,
            },
            {
              flex: 1,
              field: "createdAt",
              renderHeader: () => <Typography style={styles.titleTable}>Create at</Typography>,
            },
            {
              flex: 1,
              field: "updatedAt",
              renderHeader: () => <Typography style={styles.titleTable}>Update at</Typography>,
            },
            {
              flex: 1,
              field: "active",
              renderHeader: () => <Typography style={styles.titleTable}>Active</Typography>,
            },
            {
              flex: 0.3,
              field: "action",
              filterable: false,
              hideSortIcons: true,
              disableColumnMenu: true,
              renderHeader: () => <Typography style={styles.titleTable}>Action</Typography>,
              renderCell: (items: any) => {
                return (
                  <CommonActionMenu
                    onEdit={() => {
                      history.push({
                        pathname: RouteBase.UpdateContestManagementWId(items?.row?.name),
                        search: `?id=${items?.id}`,
                      });
                    }}
                    onSubmitRemove={onDeletePart}
                    row={items}
                  />
                );
              },
            },
          ]}
          pagination={{
            page: metaPart?.page,
            pageSize: metaPart?.pageSize,
            totalRow: metaPart?.totalRow,
          }}
          loading={loading}
          checkboxSelection
<<<<<<< HEAD
          rows={dataContest}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
=======
          rows={DataFake}
          // onPageChange={onPageChange}
          // onPageSizeChange={onPageSizeChange}
>>>>>>> 49319c653e2709a36d035d8e81d1b82bd9e7a3ee
        />
      </Card>
    </div>
  );
};

export default ContestManagement;
