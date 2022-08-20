import { IeltsReducer } from "./../redux/creators/modules/ielts";
import { useSelector } from "react-redux";
export const GET_TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
export const ROOT_ORIGINAL_URL = process.env.REACT_APP_API_URL;
export const ROOT_URL = `${process.env.REACT_APP_API_URL}/api/v1`;

export const BASE_URL = "http://103.226.250.81:8688/api/v1";

// export const POST_LIST_PARTS = `/question-parts?sort=createdAt%3ADESC&skill=${skill}`;

export const GET_LIST_LEVELS = `${ROOT_URL}/configs/question-levels`;
export const GET_LIST_QUESTION_TYPE = `${ROOT_URL}/configs/question-types`;
export const POST_UPLOAD_AUDIO = `${ROOT_URL}/upload/single`;
export const AUTH_URL = {
  SIGNUP: `${ROOT_URL}/auth/signup`,
  LOGIN: `${ROOT_URL}/auth/signin`,
  LOGOUT: `${ROOT_URL}/auth/logout`,
};

export const IELTS_URL = (testCode?: any, questionId?: string) => {
  return {
    IELTS: `${ROOT_URL}/ielts`,
    LISTENING: `${ROOT_URL}/tests/${testCode?.meta}/listening`,
    READING: `${ROOT_URL}/tests/${testCode?.meta}/reading`,
    WRITTING: `${ROOT_URL}/tests/${testCode?.meta}/writing`,
    SPEAKING: `${ROOT_URL}/tests/${testCode?.meta}/speaking`,
    TEST_CODE: `${ROOT_URL}/tests/prepare`,
    SUBMIT_READING_TEST: `${ROOT_URL}/tests/${testCode}`,
    SUBMIT_WRITING_TEST: `${ROOT_URL}/tests/${testCode}`,
    SUBMIT_LISTENING_TEST: `${ROOT_URL}/tests/${testCode}`,
    SUBMIT_SPEAKING_TEST: `${ROOT_URL}/tests/${testCode}`,
    FINISH_READING_TEST: `${ROOT_URL}/tests/${testCode}/finish`,
    FINISH_WRITING_TEST: `${ROOT_URL}/tests/${testCode}/finish`,
    FINISH_LISTENING_TEST: `${ROOT_URL}/tests/${testCode}/finish`,
    FINISH_SPEAKING_TEST: `${ROOT_URL}/tests/${testCode}/finish`,
    RESULT: `${ROOT_URL}/tests/results`,
    REVIEW_READING: `${ROOT_URL}/tests/${testCode}/reading/result`,
    REVIEW_WRITING: `${ROOT_URL}/tests/${testCode}/writing/result`,
    REVIEW_LISTENING: `${ROOT_URL}/tests/${testCode}/listening/result`,
    REVIEW_SPEAKING: `${ROOT_URL}/tests/${testCode}/speaking/result`,
    UPLOAD_AUDIO_SPEAKING: `${ROOT_URL}/tests/${testCode}/${questionId}/audio-answer`,
  };
};

export const ADMIN_READING_URL = (id?: string | number) => {
  return {
    GET_LIST_PARTS: `${ROOT_URL}/question-parts?sort=createdAt%3ADESC&skill=READING`,
    GET_PART_DETAIL: `${ROOT_URL}/question-parts/`,
    DELETE_PART: `${ROOT_URL}/question-parts/`,
    GET_LIST_QUESTION_GROUP: `${ROOT_URL}/question-parts/${id}/groups`,
    PATCH_UPDATE_PART: `${ROOT_URL}/question-parts/reading/`,
    DELETE_QUESTION_GROUP: `${ROOT_URL}/question-groups/`,
    PATCH_UPDATE_QUESTION_GROUP: `${ROOT_URL}/question-groups/reading/`,
    GET_DETAIL_QUESTION_GROUP: `${ROOT_URL}/question-groups/reading/`,
    GET_LIST_READING_QUESTIONS: `${ROOT_URL}/question-groups?page=1&pageSize=10&sort=createdAt%3ADESC&skill=READING`,
    POST_LIST_READING_QUESTIONS: `${ROOT_URL}/question-groups/reading`,
    POST_CREATE_PART: `${ROOT_URL}/question-parts/reading`,
  };
};

export const ADMIN_WRITING_URL = (id?: string | number) => {
  return {
    GET_LIST_PARTS: `${ROOT_URL}/question-parts?sort=createdAt%3ADESC&skill=WRITING`,
    POST_CREATE_PART: `${ROOT_URL}/questions/writing`,
    GET_LIST_QUESTION: `${ROOT_URL}/questions?sort=createdAt%3ADESC&skill=WRITING`,
    GET_DETAIL_QUESTION: `${ROOT_URL}/questions/`,
    PATCH_UPDATE_QUESTION: `${ROOT_URL}/questions/writing/`,
    DELETE_QUESTION: `${ROOT_URL}/questions/`,
  };
};
export const ADMIN_LISTENING_URL = (id?: string | number) => {
  return {
    GET_LIST_PARTS: `${ROOT_URL}/question-parts?sort=createdAt%3ADESC&skill=LISTENING`,
    GET_PART_DETAIL: `${ROOT_URL}/question-parts/`,
    DELETE_PART: `${ROOT_URL}/question-parts/`,
    GET_LIST_QUESTION_GROUP: `${ROOT_URL}/question-parts/${id}/groups`,
    PATCH_UPDATE_PART: `${ROOT_URL}/question-parts/listening/`,
    DELETE_QUESTION_GROUP: `${ROOT_URL}/question-groups/`,
    PATCH_UPDATE_QUESTION_GROUP: `${ROOT_URL}/question-groups/listening/`,
    GET_DETAIL_QUESTION_GROUP: `${ROOT_URL}/question-groups/listening/`,
    POST_LIST_LISTENING_QUESTIONS: `${ROOT_URL}/question-groups/listening`,
    POST_CREATE_PART: `${ROOT_URL}/question-parts/listening`,
  };
};
export const ADMIN_SPEAKING_URL = (id?: string | number) => {
  return {
    GET_LIST_PARTS: `${ROOT_URL}/question-parts?sort=createdAt%3ADESC&skill=SPEAKING`,
    GET_PART_DETAIL: `${ROOT_URL}/question-parts/`,
    DELETE_PART: `${ROOT_URL}/question-parts/speaking/`,
    GET_LIST_QUESTION_GROUP: `${ROOT_URL}/question-parts/${id}/groups`,
    PATCH_UPDATE_PART: `${ROOT_URL}/question-parts/speaking/`,
    DELETE_QUESTION_GROUP: `${ROOT_URL}/question-groups/`,
    PATCH_UPDATE_QUESTION_GROUP: `${ROOT_URL}/question-groups/speaking/`,
    GET_DETAIL_QUESTION_GROUP: `${ROOT_URL}/question-groups/speaking/`,
    POST_LIST_SPEAKING_QUESTIONS: `${ROOT_URL}/question-groups/speaking`,
    POST_CREATE_PART: `${ROOT_URL}/question-parts/speaking`,
  };
};
export const ADMIN_USER_URL = (id?: string | number) => {
  return {
    GET_LIST_PARTS: `${ROOT_URL}/users?page=1&pageSize=10&sort=createdAt%3ADESC`,
    GET_PART_DETAIL: `${ROOT_URL}/users/`,
    POST_CREATE_PART: `${ROOT_URL}/users/`,
    PATCH_UPDATE_PART: `${ROOT_URL}/users/`,
    DELETE_PART: `${ROOT_URL}/users/`,
  };
};
