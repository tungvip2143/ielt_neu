import AddIcon from "@mui/icons-material/Add";
import { Card, Typography } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonActionMenu from "components/CommonActionMenu";
import CommonDataGrid from "components/CommonDataGrid";
import useGetQuestion from "hooks/Writing/useGetQuestion";
import { isEmpty } from "lodash";
import MHeaderTable from "models/HeaderTable.model";
import { useState } from "react";
import ReadingService from "services/ReadingService";
import writingServices from "services/writingServices";
import CreateQuestionWriting from "./CreateQuestionWriting";

const WritingSkill = () => {
  const [openCreateScreen, setOpenCreateScreen] = useState({});
  const [dataQuestion, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useGetQuestion();

  const onDeletePart = async (item: any) => {
    try {
      await writingServices.deleteQuestion(item?.id);
      alert("Delete part success!");
      refetchDataTable();
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        {isEmpty(openCreateScreen) && (
          <ButtonUpload
            titleButton="Create writing"
            icon={<AddIcon />}
            onClick={() => setOpenCreateScreen({ type: "create" })}
            style={{ background: "#9155FE" }}
          />
        )}
      </div>
      {!isEmpty(openCreateScreen) && (
        <CreateQuestionWriting
          openCreateScreen={openCreateScreen}
          refetchDataTable={refetchDataTable}
          onClose={() => setOpenCreateScreen({})}
        />
      )}
      {isEmpty(openCreateScreen) && (
        <Card>
          <CommonDataGrid
            columns={[
              {
                flex: 1,
                field: "title",
                renderHeader: () => <Typography style={styles.titleTable}>Writing title</Typography>,
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
                renderHeader: () => <Typography style={styles.titleTable}>Action</Typography>,
                renderCell: (items: any) => {
                  return (
                    <CommonActionMenu
                      onEdit={() => {
                        setOpenCreateScreen({ type: "update", element: items.row });
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
      )}
    </div>
  );
};

export default WritingSkill;

const styles = {
  titleTable: {
    fontSize: 14,
    fontWeight: "bold",
  },
};
