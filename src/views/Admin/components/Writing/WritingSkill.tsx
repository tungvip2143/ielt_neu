import AddIcon from "@mui/icons-material/Add";
import { Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonActionMenu from "components/CommonActionMenu";
import CommonDataGrid from "components/CommonDataGrid";
import CommonStyles from "components/CommonStyles";
import LoadingCircular from "components/CommonStyles/LoadingCircular/LoadingCircular";
import { RouteBase } from "constants/routeUrl";
import useGetQuestion from "hooks/QuestionBank/Writing/useGetQuestion";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import writingServices from "services/writingServices";

const useStyle = makeStyles((theme) => {
  return {
    titleTable: {
      fontSize: 14,
      fontWeight: "bold",
    },
  };
});

const WritingSkill = () => {
  //! State

  const [dataQuestion, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useGetQuestion();
  const history = useHistory();
  const classes = useStyle();
  const onDeletePart = async (item: any) => {
    try {
      await writingServices.deleteQuestion(item?.id);
      toast.success("Delete part success!");
      refetchDataTable();
    } catch (error) {
      console.log("error");
    }
  };

  //! Render
  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        <Link to={RouteBase.CreateWriting}>
          <CommonStyles.Button loading={loading} style={{ background: "#9155FE" }} onClick={() => {}}>
            <AddIcon />
            Create writing
          </CommonStyles.Button>
        </Link>
      </div>

      {loading ? (
        <LoadingCircular />
      ) : (
        <Card>
          <CommonDataGrid
            columns={[
              {
                flex: 1,
                field: "title",
                renderHeader: () => <Typography className={classes.titleTable}>Writing title</Typography>,
              },
              {
                flex: 0.5,
                field: "questionPartNumber",
                renderHeader: () => <Typography className={classes.titleTable}>Part</Typography>,
              },
              {
                flex: 1,
                field: "createdAt",
                renderHeader: () => <Typography className={classes.titleTable}>Create at</Typography>,
              },
              {
                flex: 1,
                field: "updatedAt",
                renderHeader: () => <Typography className={classes.titleTable}>Update at</Typography>,
              },
              {
                flex: 0.3,
                field: "action",
                renderHeader: () => <Typography className={classes.titleTable}>Action</Typography>,
                renderCell: (items: any) => {
                  return (
                    <CommonActionMenu
                      onEdit={() => {
                        history.push({
                          pathname: RouteBase.UpdateWritingWId(items?.row?.title),
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
            rows={dataQuestion}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </Card>
      )}
    </div>
  );
};

export default WritingSkill;
