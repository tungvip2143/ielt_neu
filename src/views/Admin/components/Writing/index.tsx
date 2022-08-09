import AddIcon from "@mui/icons-material/Add";
import { Card, Typography } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonActionMenu from "components/CommonActionMenu";
import CommonDataGrid from "components/CommonDataGrid";
import useGetParts from "hooks/Reading/useGetParts";
import { isEmpty } from "lodash";
import MHeaderTable from "models/HeaderTable.model";
import { useState } from "react";
import ReadingService from "services/ReadingService";
import CreateQuestionWriting from "./CreateQuestionWriting";

const WritingSkill = () => {
  const [openCreateScreen, setOpenCreateScreen] = useState({});
  const [dataParts, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useGetParts();

  const onDeletePart = async (id: any) => {
    try {
      await ReadingService.deletePart(id);
      alert("Delete part success!");
      refetchDataTable();
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <div className="text-end mb-4">
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
          // refetchDataTable={refetchDataTable}
          onClose={() => setOpenCreateScreen({})}
        />
      )}
      {isEmpty(openCreateScreen) && (
        <Card>
          <CommonDataGrid
            columns={[
              {
                flex: 1,
                field: "passageTitle",
                renderHeader: () => <Typography style={styles.titleTable}>Writing title</Typography>,
              },
              {
                flex: 1,
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
                      onEdit={(e: MHeaderTable) => {
                        setOpenCreateScreen({ type: "update", element: items.row });
                      }}
                      onDelete={() => onDeletePart(items.id)}
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
            rows={dataParts}
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
