import { Autocomplete, TextField, Typography } from "@mui/material";
import ButtonUpload from "components/Button/ButtonUpload";
import CommonActionMenu from "components/CommonActionMenu";
import CommonDataGrid from "components/CommonDataGrid";
import useGetListExam from "hooks/ContestManagemet/useGetListExam";
import useGetListTest from "hooks/TestBank/useGetListTest";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import testBankService from "services/testBankService";
import * as yup from "yup";
import "./style.scss";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { RouteBase } from "constants/routeUrl";
import ProgressBar from "components/ProgressBar";

const validationSchema = yup.object().shape({
  //   name: yup.string().required("This field is required!"),
  //   active: yup.string().required("This field is required!"),
});

const GenerateExam = () => {
  //!State
  const history = useHistory();
  const search = useLocation<any>();
  const id = search.state?.id;
  const [examId, setExamId] = useState<any>([]);

  const [dataTest, , , , , ,] = useGetListTest();
  const [dataExam, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange] = useGetListExam(id);
  const [visible, setVisible] = useState(false);

  //! Function

  const convertOriginalExam = dataTest?.map((el: any) => ({ label: el?.examName, value: el?.id }));

  const handleGenerate = async () => {
    setVisible(true);
    const body = {
      examIds: examId?.map((el: any) => el?.value),
    };
    try {
      const response = await testBankService.generateExam(id, body);
      if (response?.data?.statusCode === 200) {
        toast.success("Gender success");
        refetchDataTable();
        setVisible(false);
      }
    } catch (error: any) {
      setVisible(false);
      toast.error(error?.response?.data?.message, {
        autoClose: 3000,
      });
    }
  };

  //! Render

  return (
    <div className="cardWrapper">
      <ProgressBar isVisible={visible} />
      <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }}>Select original exams</Typography>
      <Autocomplete
        multiple
        id="tags-standard"
        options={convertOriginalExam}
        getOptionLabel={(option: any) => option.label}
        renderInput={(params) => <TextField {...params} variant="standard" label="Original exams" />}
        onChange={(event, value) => setExamId(value)}
      />
      <div className="flex justify-center">
        <ButtonUpload
          onClick={handleGenerate}
          style={{ height: 40, marginBottom: 10, marginTop: 10 }}
          titleButton="Generate"
        />
      </div>
      <CommonDataGrid
        columns={[
          {
            flex: 1,
            field: "stt",
            renderHeader: () => <Typography>STT</Typography>,
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
            renderHeader: () => <Typography>Action</Typography>,
            renderCell: (items: any) => {
              return (
                <InfoOutlinedIcon
                  sx={{ color: "#5048E5", cursor: "pointer" }}
                  onClick={() => {
                    history.push({
                      pathname: RouteBase.generateExamDetailWid(items?.row?.id),
                      search: `?id=${items?.id}`,
                      state: { id: id },
                    });
                  }}
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
        rows={dataExam}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
export default GenerateExam;
