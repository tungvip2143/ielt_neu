import { ResponseGenerator } from "interfaces";
import { useEffect, useState, useCallback } from "react";
import TodoModel from "models/todo.model";
import useSagaCreators from "hooks/useSagaCreators";
import { todoActions } from "redux/creators/modules/todos";
import ReadingService from "services/ReadingService";

const useGetListReadingQuestion = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ReadingService.getListDataReadingService()
                setData(response?.data || [])
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return [data, loading, error];
};

export default useGetListReadingQuestion;
