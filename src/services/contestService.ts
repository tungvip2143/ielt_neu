import { ADMIN_CONTEST_URL } from "../constants/api";
import httpServices from "./httpServices";

class userService {
  getListParts(params: any = {}) {
    return httpServices.get(ADMIN_CONTEST_URL().GET_LIST_PARTS, params);
  }

  getPartDetail(id: any) {
    return httpServices.get(ADMIN_CONTEST_URL().GET_PART_DETAIL + id);
  }
  postCreatePart(body: any) {
    return httpServices.post(ADMIN_CONTEST_URL().POST_CREATE_PART, body);
  }

  deletePart(id: any) {
    return httpServices.delete(ADMIN_CONTEST_URL().DELETE_PART + id);
  }
  putUpdatePart(id: any, body: any) {
    return httpServices.put(ADMIN_CONTEST_URL().PATCH_UPDATE_PART + id, body);
  }
}
export default new userService();
