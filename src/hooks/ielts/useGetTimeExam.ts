export const useGetTimeExam = (exam: string) => {
  const timeExam = localStorage.getItem(exam) ?? "";
  console.log("1234567", exam);
  return { timeExam };
};
