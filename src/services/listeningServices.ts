import { POST_LIST_READING_QUESTIONS } from "constants/api";
import { ADMIN_LISTENING_URL, GET_LIST_LEVELS, GET_LIST_QUESTION_TYPE, POST_CREATE_PART } from "./../constants/api";
import httpServices from "./httpServices";

class listeningService {
  postCreateQuestionGroupReading(body: any) {
    return httpServices.post(POST_LIST_READING_QUESTIONS, body);
  }
  getListParts(params: any = {}) {
    return httpServices.get(ADMIN_LISTENING_URL().GET_LIST_PARTS, { params });
  }
  getPartDetail(id: any) {
    return httpServices.get(ADMIN_LISTENING_URL().GET_PART_DETAIL + id);
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
    return httpServices.delete(ADMIN_LISTENING_URL().DELETE_PART + id);
  }
  patchUpdatePart(id: any, body: any) {
    return httpServices.patch(ADMIN_LISTENING_URL().PATCH_UPDATE_PART + id, body);
  }
  getListQuestionGroup(id: any) {
    return httpServices.get(ADMIN_LISTENING_URL(id).GET_LIST_QUESTION_GROUP);
  }
  getDetailQuestionGroup(id: any) {
    return httpServices.get(ADMIN_LISTENING_URL(id).GET_DETAIL_QUESTION_GROUP + id);
  }
  deleteQuestionGroup(id: any) {
    return httpServices.delete(ADMIN_LISTENING_URL().DELETE_QUESTION_GROUP + id);
  }
  patchUpdateQuestionGroup(id: any, body: any) {
    return httpServices.patch(ADMIN_LISTENING_URL().PATCH_UPDATE_QUESTION_GROUP + id, body);
  }
}
export default new listeningService();