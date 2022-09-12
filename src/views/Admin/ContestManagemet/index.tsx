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
import testBankService from "services/testBankService";
import { toast } from "react-toastify";
import CommonStyles from "components/CommonStyles";

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
  //! State
  const [dataContest, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange, refresh] =
    useContestManagemet();

  const [dataItemId, setDataItemId] = useState<null | number>(null);
  const [dataItemIds, setDataItemIds] = useState<null | number>(null);
  console.log("dataItemIds", dataItemIds);

  // const refetchDataCanStart = async () => {
  //   dataContest?.canStart;
  // };
  const history = useHistory();
  const onDeletePart = async (item: any) => {
    try {
      const response = await contestService.deleteExamination(item?.id);
      if (response.data.statusCode === 200) {
        toast.success("Exam has been delete!");
        refetchDataTable();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const onChangeStatus = async (item: any) => {
    const body = {
      canStart: true,
    };
    try {
      const response = await contestService.putUpdateExamination(item?.id, body);
      if (response.data.statusCode === 200) {
        toast.success("Status has been changed!");
        setDataItemId(item?.id);
        refresh();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const onChangeStatusActive = async (item: any) => {
    const body = {
      active: true,
    };
    try {
      const response = await contestService.putUpdateExamination(item?.id, body);
      if (response.data.statusCode === 200) {
        toast.success("Status has been changed!");
        setDataItemIds(item?.row?._id);
        refresh();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  //!Function

  //! Render
  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        <Link to={RouteBase.CreateContestManagement}>
          <ButtonUpload
            titleButton="Create examination"
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
              renderHeader: () => <Typography style={styles.titleTable}>Examination name</Typography>,
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

            // {
            //   flex: 1,
            //   field: "active",
            //   renderHeader: () => <Typography style={styles.titleTable}>Active</Typography>,
            // },
            {
              flex: 1,
              field: "generate",
              renderHeader: () => <Typography style={styles.titleTable}>Generate exam</Typography>,
              renderCell: (items: any) => {
                return (
                  <Button
                    variant="contained"
                    style={styles.buttonOpenModal}
                    onClick={() => history.push({ pathname: RouteBase.GenerateExam, state: { id: items?.id } })}
                  >
                    Generate exam
                  </Button>
                );
              },
            },
            {
              flex: 0.7,
              field: "active",
              renderHeader: () => <Typography style={styles.titleTable}>Active</Typography>,
              renderCell: (items: any) => {
                return items?.row?.active || items?.row?._id === dataItemIds ? (
                  <CommonStyles.Button
                    variant="contained"
                    style={{ borderRadius: 20 }}
                    disabled={items?.row?.active || items?.row?._id === dataItemIds}
                  >
                    Actived
                  </CommonStyles.Button>
                ) : (
                  <CommonStyles.Button
                    variant="contained"
                    style={styles.buttonOpenModal}
                    onClick={() => onChangeStatusActive(items)}
                  >
                    Start Active
                  </CommonStyles.Button>
                );
              },
            },
            {
              flex: 0.7,
              field: "canStart",
              renderHeader: () => <Typography style={styles.titleTable}>Can Start</Typography>,
              renderCell: (items: any) => {
                console.log("asasff", items?.row);

                return items?.row?.canStart || items?.row?.id === dataItemId ? (
                  <CommonStyles.Button
                    variant="contained"
                    style={{ borderRadius: 20 }}
                    disabled={items?.row?.canStart || items?.row?.id === dataItemId}
                  >
                    Testing
                  </CommonStyles.Button>
                ) : (
                  <CommonStyles.Button
                    variant="contained"
                    style={styles.buttonOpenModal}
                    onClick={() => onChangeStatus(items)}
                  >
                    Start exam
                  </CommonStyles.Button>
                );
              },
            },
            {
              flex: 0.4,
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
          rows={dataContest}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Card>
    </div>
  );
};

export default ContestManagement;
