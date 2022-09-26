// import TableCommon from "./TableCommon";
import { Card, Typography } from "@mui/material";
import CommonDataGrid from "components/CommonDataGrid";
import useGetListStudents from "hooks/UserManagement/students/useGetListStudents";
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
  console.log("dataFileExcel", dataFileExcel);

  //! State
  const { data, loading, error, refetchDataTable, meta, onPageChange, onPageSizeChange } = useGetListStudents();

  const history = useHistory();

  // const onDeletePart = async (item: any) => {
  //   try {
  //     await studentService.deletePart(item?.row?._id);
  //     //   await refetchDataTable();
  //     await toast.success("Delete success!");
  //   } catch (error) {
  //     toast.error("Error!");
  //   }
  // };

  //! Render
  return (
    <div>
      <Card>
        <CommonDataGrid
          columns={[
            {
              flex: 1,
              field: "studentCode",
              renderHeader: () => <Typography style={styles.titleTable}>Student Code</Typography>,
            },
            // {
            //   flex: 1,
            //   field: "gender",
            //   renderHeader: () => <Typography style={styles.titleTable}>Gender</Typography>,
            // },
            // {
            //   flex: 1,
            //   field: "fullname",
            //   renderHeader: () => <Typography style={styles.titleTable}>Fullname</Typography>,
            // },
            // {
            //   flex: 1,
            //   field: "birthday",
            //   renderHeader: () => <Typography style={styles.titleTable}>Birthday</Typography>,
            // },
            // {
            //   flex: 1,
            //   field: "identifyCard",
            //   renderHeader: () => <Typography style={styles.titleTable}>Identify Card</Typography>,
            // },
            // {
            //   flex: 1,
            //   field: "phoneNumber",
            //   renderHeader: () => <Typography style={styles.titleTable}>Phone Number</Typography>,
            // },
            // {
            //   flex: 1,
            //   field: "email",
            //   renderHeader: () => <Typography style={styles.titleTable}>Email</Typography>,
            // },
            // {
            //   flex: 1,
            //   field: "speciality",
            //   renderHeader: () => <Typography style={styles.titleTable}>Speciality</Typography>,
            // },
            // {
            //   flex: 1,
            //   field: "class",
            //   renderHeader: () => <Typography style={styles.titleTable}>Class</Typography>,
            // },
          ]}
          checkboxSelection
          rows={dataFileExcel}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          hideFooter={true}
          getRowId={(row: any) => row._id}
        />
      </Card>
    </div>
  );
};

export default ListUserContest;
