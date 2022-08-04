export interface ResponseParams {
  questionType: number | undefined | string;
  question: string;
  levelType: string;
  firstAnswer: string;
  secondAnswer: string;
  thirdAnswer: string;
  fourAnswer: string;
  questionSimple: string;
  correctAnswer: string
}

export interface QuestionTypeI {
  title: string;
  name: string;
  answer: string;
}
