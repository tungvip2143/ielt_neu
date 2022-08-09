import { ADMIN_WRITING_URL } from "./../constants/api";
import httpServices from "./httpServices";

class writingServices {
  getListParts(params: any = {}) {
    return httpServices.get(ADMIN_WRITING_URL().GET_LIST_PARTS, { params });
  }
}
export default new writingServices();
