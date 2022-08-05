import { GET_LIST_LEVELS, POST_CREATE_PART } from "./../constants/api";
import { GET_LIST_READING_QUESTIONS, POST_LIST_PARTS, POST_LIST_READING_QUESTIONS } from "constants/api";
import httpServices from "./httpServices";

class ReadingService {
  getListDataReadingService() {
    return httpServices.get(GET_LIST_READING_QUESTIONS);
  }
  postListDataReadingService(body: any) {
    return httpServices.post(POST_LIST_READING_QUESTIONS, body);
  }
  getListParts() {
    return httpServices.get(POST_LIST_PARTS);
  }
  postCreatePart(body: any) {
    return httpServices.post(POST_CREATE_PART, body);
  }
  getListLevels() {
    return httpServices.get(GET_LIST_LEVELS);
  }
}
export default new ReadingService();
