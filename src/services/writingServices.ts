import { ADMIN_READING_URL } from "./../constants/api";
import httpServices from "./httpServices";

class writingServices {
  getListParts() {
    return httpServices.get(ADMIN_READING_URL("WRITING").GET_LIST_PARTS);
  }
}
export default new writingServices();
