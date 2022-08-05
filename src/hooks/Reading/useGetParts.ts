import { useEffect, useState } from "react";
import ReadingService from "services/ReadingService";

const useGetParts = () => {
  const [dataParts, setDataParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const refetch = async () => {
    try {
      const response = await ReadingService.getListParts();
      if (response.status === 200) {
        setDataParts(response?.data || []);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReadingService.getListParts();
        if (response.status === 200) {
          setDataParts(response?.data || []);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return [dataParts, loading, error, refetch];
};

export default useGetParts;
