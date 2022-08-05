import { useEffect, useState } from "react";
import ReadingService from "services/ReadingService";

const useGetListReadingQuestion = () => {
  const [dataReading, setDataReading] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReadingService.getListDataReadingService();
        if (response.status === 200) {
          setDataReading(response?.data || []);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return [dataReading, loading, error];
};

export default useGetListReadingQuestion;
