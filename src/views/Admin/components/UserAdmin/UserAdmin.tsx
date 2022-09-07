// import TableCommon from "./TableCommon";
import AddIcon from "@mui/icons-material/Add";
import { Card, Typography } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonDataGrid from "components/CommonDataGrid";
import { Link, useHistory } from "react-router-dom";
import { RouteBase } from "constants/routeUrl";
import useGetListStudents from "hooks/UserManagement/students/useGetListStudents";
import studentService from "services/studentService";
import CommonActionMenu from "components/CommonActionMenu";
import { toast } from "react-toastify";

const styles = {
  titleTable: {
    fontSize: 14,
    fontWeight: "bold",
  },
};

const UserAdmin = () => {
  //! State
  const {
    data: dataParts,
    loading,
    error,
    refetchDataTable,
    meta: metaPart,
    onPageChange,
    onPageSizeChange,
  } = useGetListStudents();

  const history = useHistory();

  const onDeletePart = async (item: any) => {
    try {
      await studentService.deletePart(item?.row?._id);
      await refetchDataTable();
      await toast.success("Delete success!");
    } catch (error) {
      toast.error("Error!");
    }
  };

  //! Render
  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        <Link to={RouteBase.CreateUser}>
          <ButtonUpload
            titleButton="Create User"
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
              field: "studentCode",
              renderHeader: () => <Typography style={styles.titleTable}>Student Code</Typography>,
            },
            {
              flex: 1,
              field: "fullname",
              renderHeader: () => <Typography style={styles.titleTable}>Fullname</Typography>,
            },
            {
              flex: 1,
              field: "candidateCode",
              renderHeader: () => <Typography style={styles.titleTable}>Candidate Code</Typography>,
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
                        pathname: RouteBase.UpdateUserWID(items?.row?.fullname),
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
          checkboxSelection
          pagination={{
            page: metaPart?.page,
            pageSize: metaPart?.pageSize,
            totalRow: metaPart?.total,
          }}
          loading={loading}
          rows={dataParts}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          getRowId={(row: any) => row._id}
        />
      </Card>
    </div>
  );
};

export default UserAdmin;
