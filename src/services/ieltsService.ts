import { IELTS_URL } from "constants/api";
import httpServices from "services/httpServices";
class IeltsService {
  getIeltsListening() {
    return httpServices.get(IELTS_URL.LISTENING);
  }

  createIeltsListening(body = {}) {
    return httpServices;
  }
  getIeltsReading() {
    return httpServices.get(IELTS_URL.READING);
  }
  getIeltsWritting() {
    return httpServices.get(IELTS_URL.WRITTING);
  }
  getIeltsSpeaking() {
    return httpServices.get(IELTS_URL.SPEAKING);
  }
}

export default new IeltsService();
