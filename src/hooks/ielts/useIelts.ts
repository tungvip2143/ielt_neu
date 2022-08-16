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

export const useIeltsWritting = (testCode: any) => {
  return useQuery("get ielts writting data", ieltsService.getIeltsWritting, {
    onError: (error) => showError(getErrorMsg(error)),
    meta: testCode,
  });
};
export const useUpdateIeltsWriting = () => {
  return useMutation(ieltsService.updateIeltsWriting, {
    onError: (error) => showError(getErrorMsg(error)),
  });
};

export const useFinishIeltsWritingTest = () => {
  return useMutation(ieltsService.finishIeltsWriting, {
    onError: (error) => showError(getErrorMsg(error)),
  });
};

export const useIeltsReading = (testCode: any) => {
  return useQuery("get ielts readding data", ieltsService.getIeltsReading, {
    onError: (error) => showError(getErrorMsg(error)),
    meta: testCode,
  });
};

export const useUpdateIeltsReadingTest = () => {
  return useMutation(ieltsService.updateIeltsReading, {
    onError: (error) => showError(getErrorMsg(error)),
  });
};
export const useFinishIeltsReadingTest = () => {
  return useMutation(ieltsService.finishIeltsReading, {
    onError: (error) => showError(getErrorMsg(error)),
  });
};

export const useIeltsSpeaking = () => {
  return useQuery("get ielts speaking data", ieltsService.getIeltsSpeaking, {
    onError: (error) => showError(getErrorMsg(error)),
  });
};
export const useIeltsResult = (query: any) => {
  return useQuery(["get ielts results", query], () => ieltsService.getIeltsTestResult(query), {
    onError: (error) => showError(getErrorMsg(error)),
  });
};
