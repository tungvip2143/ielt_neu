import { useSelector } from "react-redux";
import { IELTS_URL } from "constants/api";
import httpServices from "services/httpServices";

class IeltsService {
  createIeltsTestCode(body = {}) {
    return httpServices.post(IELTS_URL().TEST_CODE, { ...body });
  }
  getIeltsListening(testCode: any) {
    return httpServices.get(IELTS_URL(testCode).LISTENING);
  }
  createIeltsListening(body = {}) {
    return httpServices;
  }
  getIeltsReading(testCode: any) {
    return httpServices.get(IELTS_URL(testCode).READING);
  }

  getIeltsWritting(testCode: any) {
    return httpServices.get(IELTS_URL(testCode).WRITTING);
  }

  updateIeltsWriting(data: any) {
    const { values, testCode } = data;
    console.log("data api", data);
    return httpServices.patch(IELTS_URL(testCode).SUBMIT_WRITING_TEST, values);
  }

  updateIeltsReading(data: any) {
    const { values, testCode } = data;
    console.log("data api", data);
    return httpServices.patch(IELTS_URL(testCode).SUBMIT_READING_TEST, values);
  }
  updateIeltsListening(data: any) {
    const { values, testCode } = data;
    console.log("data api", data);
    return httpServices.patch(IELTS_URL(testCode).SUBMIT_LISTENING_TEST, values);
  }
  updateIeltsSpeaking(data: any) {
    const { values, testCode } = data;
    console.log("data api", data);
    return httpServices.patch(IELTS_URL(testCode).SUBMIT_SPEAKING_TEST, values);
  }
  getIeltsSpeaking(testCode: any) {
    return httpServices.get(IELTS_URL(testCode).SPEAKING);
  }
  getIeltsTestResult(query: { page: number; skill: string; pageSize: number }) {
    const { page = 1, skill, pageSize = 5 } = query;
    return httpServices.get(`${IELTS_URL().RESULT}?page=${page}&pageSize=${pageSize}&skill=${skill}`);
  }

  finishIeltsReading(testCode: any) {
    return httpServices.post(IELTS_URL(testCode).FINISH_READING_TEST);
  }
  finishIeltsWriting(testCode: any) {
    return httpServices.post(IELTS_URL(testCode).FINISH_WRITING_TEST);
  }
  finishIeltsListening(testCode: any) {
    return httpServices.post(IELTS_URL(testCode).FINISH_LISTENING_TEST);
  }
  finishIeltsSpeaking(testCode: any) {
    return httpServices.post(IELTS_URL(testCode).FINISH_SPEAKING_TEST);
  }
}

export default new IeltsService();
