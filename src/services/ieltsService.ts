import { useSelector } from "react-redux";
import { IELTS_URL } from "constants/api";
import httpServices from "services/httpServices";

class IeltsService {
  createIeltsTestCode(body = {}) {
    return httpServices.post(IELTS_URL().TEST_CODE, { ...body });
  }
  getIeltsListening() {
    return httpServices.get(IELTS_URL().LISTENING);
  }

  createIeltsListening(body = {}) {
    return httpServices;
  }
  getIeltsReading(testCode: any) {
    return httpServices.get(IELTS_URL(testCode).READING);
  }
  getIeltsWritting() {
    return httpServices.get(IELTS_URL().WRITTING);
  }
  getIeltsSpeaking() {
    return httpServices.get(IELTS_URL().SPEAKING);
  }
}

export default new IeltsService();
