import { IeltsReducer } from "./../redux/creators/modules/ielts";
import { useSelector } from "react-redux";
export const GET_TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
export const BASE_URL = "http://103.226.250.81:8688/api/v1";
export const GET_LIST_READING_QUESTIONS = "/question-groups?page=1&pageSize=10&sort=createdAt%3ADESC&skill=READING";
export const POST_LIST_READING_QUESTIONS = "/question-groups/reading";
// export const POST_LIST_PARTS = `/question-parts?sort=createdAt%3ADESC&skill=${skill}`;
export const POST_CREATE_PART = "/question-parts/reading";
export const GET_LIST_LEVELS = "/configs/question-levels";
export const GET_LIST_QUESTION_TYPE = "/configs/question-types";
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
    WRITTING: `${ROOT_URL}/tests/${testCode?.meta}/writing`,
    SPEAKING: `${ROOT_URL}/tests/speaking`,
    TEST_CODE: `${ROOT_URL}/tests/prepare`,
    SUBMIT_READING_TEST: `${ROOT_URL}/tests/${testCode}`,
    SUBMIT_WRITING_TEST: `${ROOT_URL}/tests/${testCode}`,
    FINISH_READING_TEST: `${ROOT_URL}/tests/${testCode}/finish`,
    FINISH_WRITING_TEST: `${ROOT_URL}/tests/${testCode}/finish`,
    RESULT: `${ROOT_URL}/tests/results`,
  };
};

export const ADMIN_READING_URL = (id?: string | number) => {
  return {
    GET_LIST_PARTS: `/question-parts?sort=createdAt%3ADESC&skill=READING`,
    GET_PART_DETAIL: "/question-parts/",
    DELETE_PART: "/question-parts/",
    GET_LIST_QUESTION_GROUP: `/question-parts/${id}/groups`,
    PATCH_UPDATE_PART: `/question-parts/reading/`,
    DELETE_QUESTION_GROUP: "/question-groups/",
  };
};
