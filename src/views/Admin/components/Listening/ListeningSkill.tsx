// import TableCommon from "./TableCommon";
import AddIcon from "@mui/icons-material/Add";
import { Card, Typography } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonActionMenu from "components/CommonActionMenu";
import CommonDataGrid from "components/CommonDataGrid";
import useGetParts from "hooks/Listening/useGetParts";
import { Link, useHistory } from "react-router-dom";
import listeningService from "services/listeningService";
import { RouteBase } from "constants/routeUrl";

const styles = {
  titleTable: {
    fontSize: 14,
    fontWeight: "bold",
  },
};

const ListeningSkill = () => {
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
      await listeningService.deletePart(item?.id);
      refetchDataTable();
    } catch (error) {
      console.log("error");
    }
  };

  //! Render
  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        <Link to={RouteBase.CreateListening}>
          <ButtonUpload
            titleButton="Create listening"
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
              field: "partTitle",
              renderHeader: () => <Typography style={styles.titleTable}>Listening title</Typography>,
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
                      history.push(RouteBase.UpdateListeningWId(items.id));
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

export default ListeningSkill;
