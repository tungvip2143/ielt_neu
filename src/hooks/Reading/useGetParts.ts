import MPartReading from "models/Reading/Part.model";
import { useEffect, useState } from "react";
import ReadingService from "services/ReadingService";

const useGetParts = () => {
  const [dataParts, setDataParts] = useState<MPartReading[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [metaPart, setMetaPart] = useState([]);

  const refetchDataTable = async () => {
    try {
      const response = await ReadingService.getListParts();
      if (response.data.statusCode === 200) {
        const parts = MPartReading.parsePartListFromResponse(response?.data?.data?.data || []);
        setDataParts(parts);
        setMetaPart(response?.data?.data?.paging || {});
      }
    } catch (error: any) {
      setError(error);
    }
  };
console.log('metaPart',metaPart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReadingService.getListParts();
        if (response.data.statusCode === 200) {
          const parts = MPartReading.parsePartListFromResponse(response?.data?.data?.data || []);
          setDataParts(parts);
          setMetaPart(response?.data?.data?.paging || {});
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return [dataParts, loading, error, refetchDataTable, metaPart];
};

export default useGetParts;
