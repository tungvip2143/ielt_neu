// import TableCommon from "./TableCommon";
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
import CreateQuestionReading from "./component";

const ReadingSkill = () => {
  const [openCreateScreen, setOpenCreateScreen] = useState({});
  const [dataParts, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useGetParts();

  const onDeletePart = async (item: any) => {
    try {
      await ReadingService.deletePart(item?.id);
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
            titleButton="Create reading"
            icon={<AddIcon />}
            onClick={() => setOpenCreateScreen({ type: "create" })}
            style={{ background: "#9155FE" }}
          />
        )}
      </div>
      {!isEmpty(openCreateScreen) && (
        <CreateQuestionReading
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
                field: "passageTitle",
                renderHeader: () => <Typography style={styles.titleTable}>Reading title</Typography>,
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
                filterable: false,
                hideSortIcons: true,
                disableColumnMenu: true,
                renderHeader: () => <Typography style={styles.titleTable}>Action</Typography>,
                renderCell: (items: any) => {
                  return (
                    <CommonActionMenu
                      onEdit={() => {
                        setOpenCreateScreen({ type: "update", element: items.row });
                      }}
                      onSubmitRemove={onDeletePart}
                      row={items}
                      // onDelete={() => onDeletePart(items.id)}
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

export default ReadingSkill;

const styles = {
  titleTable: {
    fontSize: 14,
    fontWeight: "bold",
  },
};
