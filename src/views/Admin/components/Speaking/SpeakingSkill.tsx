import AddIcon from "@mui/icons-material/Add";
import { Card, Typography } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonActionMenu from "components/CommonActionMenu";
import CommonDataGrid from "components/CommonDataGrid";
import { RouteBase } from "constants/routeUrl";
import useGetQuestion from "hooks/Writing/useGetQuestion";

import { Link, useHistory } from "react-router-dom";
import readingService from "services/ReadingService";

const styles = {
  titleTable: {
    fontSize: 14,
    fontWeight: "bold",
  },
};
const SpeakingSkill = () => {
  const [dataQuestion, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useGetQuestion();
  const history = useHistory();

  const onDeletePart = async (item: any) => {
    try {
      await readingService.deletePart(item?.id);
      refetchDataTable();
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        <Link to={RouteBase.CreateSpeaking}>
          <ButtonUpload
            titleButton="Create speaking"
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
              field: "title",
              renderHeader: () => <Typography style={styles.titleTable}>Speaking title</Typography>,
            },
            {
              flex: 0.5,
              field: "level",
              renderHeader: () => <Typography style={styles.titleTable}>Level</Typography>,
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
                      history.push(RouteBase.UpdateSpeakingWId(items.id));
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
          rows={dataQuestion}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Card>
    </div>
  );
};

export default SpeakingSkill;
