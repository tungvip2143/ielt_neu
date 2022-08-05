import { IeltsReducer } from "./../redux/creators/modules/ielts";
import { useSelector } from "react-redux";
export const GET_TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
export const BASE_URL = "http://103.226.250.81:8688/api/v1"
export const GET_LIST_READING_QUESTIONS = "/questions"
export const POST_LIST_READING_QUESTIONS = "/question-groups/reading"
export const POST_LIST_PARTS = "/question-parts"
export const POST_CREATE_PART = "/question-parts/reading"
export const GET_LIST_LEVELS = "/configs/question-levels"
export const ROOT_URL = process.env.REACT_APP_API_URL;

export const AUTH_URL = {
  SIGNUP: `${ROOT_URL}/auth/signup`,
  LOGIN: `${ROOT_URL}/auth/signin`,
  LOGOUT: `${ROOT_URL}/auth/logout`,
};

export const IELTS_URL = (testCode?: any) => {
  return {
    IELTS: `${ROOT_URL}/ielts`,
    LISTENING: `${ROOT_URL}/ielts/listening`,
    READING: `${ROOT_URL}/tests/${testCode?.meta}/reading`,
    WRITTING: `${ROOT_URL}/ielts/writting`,
    SPEAKING: `${ROOT_URL}/ielts/speaking`,
    TEST_CODE: `${ROOT_URL}/tests/prepare`,
  };
};
