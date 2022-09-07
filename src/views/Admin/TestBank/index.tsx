import { Card, Typography } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonDataGrid from "components/CommonDataGrid";
import { RouteBase } from "constants/routeUrl";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import useGetListTest from "hooks/TestBank/useGetListTest";
import CommonActionMenu from "components/CommonActionMenu";
import testBankService from "services/testBankService";
import { toast } from "react-toastify";

const TestBank = () => {
  const history = useHistory();
  const [dataTest, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useGetListTest();

  const onDeleteTest = async (item: any) => {
    try {
      await testBankService.deleteTest(item?.id);
      toast.success("Delete test success!");
      refetchDataTable();
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        <Link to={RouteBase.CreateTest}>
          <ButtonUpload
            titleButton="Create test"
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
              field: "examName",
              renderHeader: () => <Typography>Exam name</Typography>,
            },
            {
              flex: 1,
              field: "examCode",
              renderHeader: () => <Typography>Exam code</Typography>,
            },
            {
              flex: 1,
              field: "createdAt",
              renderHeader: () => <Typography>Create at</Typography>,
            },
            {
              flex: 1,
              field: "updatedAt",
              renderHeader: () => <Typography>Update at</Typography>,
            },
            {
              flex: 0.3,
              field: "action",
              filterable: false,
              hideSortIcons: true,
              disableColumnMenu: true,
              renderHeader: () => <Typography>Action</Typography>,
              renderCell: (items: any) => {
                return (
                  <CommonActionMenu
                    onEdit={() => {
                      history.push({
                        pathname: RouteBase.UpdateTestWId(items?.row?.examName),
                        search: `?id=${items?.id}`,
                      });
                    }}
                    onSubmitRemove={onDeleteTest}
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
          checkboxSelection
          rows={dataTest}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Card>
    </div>
  );
};

export default TestBank;
