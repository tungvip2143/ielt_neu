import { POST_LIST_READING_QUESTIONS } from "constants/api";
import { ADMIN_READING_URL, GET_LIST_LEVELS, GET_LIST_QUESTION_TYPE, POST_CREATE_PART } from "./../constants/api";
import httpServices from "./httpServices";

class ReadingService {
  postCreateQuestionGroupReading(body: any) {
    return httpServices.post(POST_LIST_READING_QUESTIONS, body);
  }
  getListParts() {
    return httpServices.get(ADMIN_READING_URL().GET_LIST_PARTS);
  }
  getPartDetail(id: any) {
    return httpServices.get(ADMIN_READING_URL().GET_PART_DETAIL + id);
  }
  postCreatePart(body: any) {
    return httpServices.post(POST_CREATE_PART, body);
  }
  getListLevels() {
    return httpServices.get(GET_LIST_LEVELS);
  }
  getListQuestionType() {
    return httpServices.get(GET_LIST_QUESTION_TYPE);
  }
  deletePart(id: any) {
    return httpServices.delete(ADMIN_READING_URL().DELETE_PART + id);
  }
  getListQuestionGroup(id: any) {
    return httpServices.get(ADMIN_READING_URL(id).GET_LIST_QUESTION_GROUP);
  }
  patchUpdatePart(id: any, body: any){
    return httpServices.patch(ADMIN_READING_URL().PATCH_UPDATE_PART + id, body)
  }
  deleteQuestionGroup(id: any){
    return httpServices.delete(ADMIN_READING_URL().DELETE_QUESTION_GROUP + id)
  }
}
export default new ReadingService();
