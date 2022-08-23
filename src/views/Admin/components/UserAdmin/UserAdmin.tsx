// import TableCommon from "./TableCommon";
import AddIcon from "@mui/icons-material/Add";
import { Card, Typography } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonActionMenu from "./UserDetailModal";
import CommonDataGrid from "components/CommonDataGrid";
import useGetParts from "hooks/UserManagement/useGetParts";
import { Link, useHistory } from "react-router-dom";
import userService from "services/userService";
import { RouteBase } from "constants/routeUrl";

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
  } = useGetParts();

  const history = useHistory();

  const onDeletePart = async (item: any) => {
    try {
      await userService.deletePart(item?.id);
      refetchDataTable();
    } catch (error) {
      console.log("error");
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
              field: "username",
              renderHeader: () => <Typography style={styles.titleTable}>Username</Typography>,
            },
            {
              flex: 1,
              field: "email",
              renderHeader: () => <Typography style={styles.titleTable}>Email</Typography>,
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
                return <CommonActionMenu row={items} />;
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
