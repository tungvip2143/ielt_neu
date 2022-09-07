// import TableCommon from "./TableCommon";
import { Card, Typography } from "@mui/material";
import CommonDataGrid from "components/CommonDataGrid";
// import ListUserContest from "models/Exam/ListUserContest";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import studentService from "services/studentService";

const styles = {
  titleTable: {
    fontSize: 14,
    fontWeight: "bold",
  },
};

const ListUserContest = ({ dataFileExcel }: any) => {
  //! State
  //   const {
  //     data: dataFileExcel,
  //     loading,
  //     error,
  //     refetchDataTable,
  //     meta: metaPart,
  //     onPageChange,
  //     onPageSizeChange,
  //   } = useGetListStudents();

  const history = useHistory();

  const onDeletePart = async (item: any) => {
    try {
      await studentService.deletePart(item?.row?._id);
      //   await refetchDataTable();
      await toast.success("Delete success!");
    } catch (error) {
      toast.error("Error!");
    }
  };

  //! Render
  return (
    <div>
      {/* <div style={{ textAlign: "end", marginBottom: 10 }}>
        <Link to={RouteBase.CreateUser}>
          <ButtonUpload
            titleButton="Create User"
            icon={<AddIcon />}
            onClick={() => {}}
            style={{ background: "#9155FE" }}
          />
        </Link>
      </div> */}

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
            // {
            //   flex: 0.3,
            //   field: "action",
            //   filterable: false,
            //   hideSortIcons: true,
            //   disableColumnMenu: true,
            //   renderHeader: () => <Typography style={styles.titleTable}>Action</Typography>,
            //   //   renderCell: (items: any) => {
            //   //     return (
            //   //       <CommonActionMenu
            //   //         onEdit={() => {
            //   //           console.log("123");
            //   //           //   history.push({
            //   //           //     pathname: RouteBase.UpdateUserWID(items?.row?.fullname),
            //   //           //     search: `?id=${items?.id}`,
            //   //           //   });
            //   //         }}
            //   //         // onSubmitRemove={onDeletePart}
            //   //         // row={items}
            //   //       />
            //   //     );
            //   //   },
            // },
          ]}
          checkboxSelection
          //   pagination={{
          //     page: metaPart?.page,
          //     pageSize: metaPart?.pageSize,
          //     totalRow: metaPart?.total,
          //   }}
          //   loading={loading}
          rows={dataFileExcel}
          //   onPageChange={onPageChange}
          //   onPageSizeChange={onPageSizeChange}
          getRowId={(row: any) => row._id}
        />
      </Card>
    </div>
  );
};

export default ListUserContest;
