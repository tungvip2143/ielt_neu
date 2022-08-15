import { PAGE_SIZE } from "constants/constants";
import MExamManagement from "models/ExamManagement/ExamManagement.model";
import MPagination from "models/Pagination.model";
import { useEffect, useState } from "react";
import ReadingService from "services/ReadingService";

const useExamManagement = () => {
  const [dataExam, setDataExam] = useState<MExamManagement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [metaPart, setMetaPart] = useState<MPagination>({
    page: 0,
    pageSize: PAGE_SIZE[0],
    totalRow: 0,
  });
  const [params, setParams] = useState({
    page: 1,
    pageSize: PAGE_SIZE[0],
  });

  const refetchDataTable = async () => {
    setParams({
      page: 1,
      pageSize: PAGE_SIZE[0],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReadingService.getListParts(params);

        if (response.data.statusCode === 200) {
          const parts = MExamManagement.parsePartListFromResponse(response?.data?.data?.data || []);
          setDataExam(parts);
          setMetaPart(MPagination.parsePaginationFromResponse(response?.data?.data?.paging));
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  const onPageChange = (page: number) => {
    setParams({ ...params, page });
  };
  const onPageSizeChange = (pageSize: number) => {
    setParams({ pageSize, page: 1 });
  };

  return [dataExam, loading, error, refetchDataTable, metaPart, onPageChange, onPageSizeChange];
};

export default useExamManagement;
