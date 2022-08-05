import { GET_LIST_READING_QUESTIONS, POST_LIST_READING_QUESTIONS } from "constants/api";
import httpServices from "./httpServices";

class ReadingService {
    getListDataReadingService() {
        return httpServices.get(GET_LIST_READING_QUESTIONS);
    }
    postListDataReadingService(body: any) {
        return httpServices.post(POST_LIST_READING_QUESTIONS, body);
    }
}
export default new ReadingService()