export interface ResponseParams {
  questionType: number | undefined | string;
  questionText: string;
  questionTip: string;
  question: string;
  levelType: string;
  firstAnswer: string;
  secondAnswer: string;
  thirdAnswer: string;
  fourAnswer: string;
  questionSimple: string;
  correctAnswer: string;
  parts: string;
  partTitle: string;
  levelPart: string;
  partNumber: string;
  partAudio: string;
  directionAudio?: string;
  title?: string;
  userType: string;
  username?: string;
  email?: string;
  fullname?: string;
  audio?: string;
  textField?: string;
}

export interface QuestionTypeI {
  title: string;
  name: string;
  answer: string;
}

export interface ReadingQuestionResponse {
  answer: string;
  createdAt: string;
  deleted: false;
  explanationText: string;
  groupId: string;
  id: string;
  level: string;
  questionText: string;
  skill: string;
  updatedAt: string;
}

export interface PartI {
  level: string;
  passageTitle: string;
  passageText: string;
}
