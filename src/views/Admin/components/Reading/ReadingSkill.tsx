// import TableCommon from "./TableCommon";
import AddIcon from "@mui/icons-material/Add";
import { Card, Typography } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonActionMenu from "components/CommonActionMenu";
import CommonDataGrid from "components/CommonDataGrid";
import LoadingPage from "components/Loading";
import { RouteBase } from "constants/routeUrl";
import useGetParts from "hooks/QuestionBank/Reading/useGetParts";
import { isEmpty } from "lodash";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ReadingService from "services/ReadingService";

const styles = {
  titleTable: {
    fontSize: 14,
    fontWeight: "bold",
  },
};
const ReadingSkill = () => {
  const [dataParts, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useGetParts();
  const history = useHistory();
  const onDeletePart = async (item: any) => {
    try {
      await ReadingService.deletePart(item?.id);
      toast.success("Delete part success!");
      refetchDataTable();
    } catch (error) {
      toast.error("error");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        <Link to={RouteBase.CreateReading}>
          <ButtonUpload
            titleButton="Create reading"
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
              field: "passageTitle",
              renderHeader: () => <Typography style={styles.titleTable}>Reading title</Typography>,
            },
            {
              flex: 1,
              field: "partNumber",
              renderHeader: () => <Typography style={styles.titleTable}>Part</Typography>,
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
              // disableColumnMenu: true,
              renderHeader: () => <Typography style={styles.titleTable}>Action</Typography>,
              renderCell: (items: any) => {
                return (
                  <CommonActionMenu
                    onEdit={() => {
                      history.push({
                        pathname: RouteBase.UpdateReadingWId(items?.row?.passageTitle),
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
            totalRow: metaPart?.totalRow,
          }}
          loading={loading}
          rows={dataParts}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Card>
    </div>
  );
};

export default ReadingSkill;
