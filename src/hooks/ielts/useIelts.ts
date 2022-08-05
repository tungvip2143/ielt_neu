import { getErrorMsg } from "./../../helpers/index";
import { showError, showSuccess } from "helpers/toast";
import { useQuery, useMutation } from "react-query";
import ieltsService from "services/ieltsService";

export const useIeltsTestCode = () => {
  return useMutation(ieltsService.createIeltsTestCode, {
    onError: (error) => showError(getErrorMsg(error)),
  });
};
export const useIeltsListening = () => {
  return useQuery("get ielts listening data", ieltsService.getIeltsListening, {
    onError: (error) => showError(getErrorMsg(error)),
  });
};

export const useIeltsWritting = () => {
  return useQuery("get ielts writting data", ieltsService.getIeltsWritting, {
    onError: (error) => showError(getErrorMsg(error)),
  });
};

export const useIeltsReading = (testCode: any) => {
  return useQuery("get ielts readding data", ieltsService.getIeltsReading, {
    onError: (error) => showError(getErrorMsg(error)),
    meta: testCode,
  });
};

export const useIeltsSpeaking = () => {
  return useQuery("get ielts speaking data", ieltsService.getIeltsSpeaking, {
    onError: (error) => showError(getErrorMsg(error)),
  });
};
