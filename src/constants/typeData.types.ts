export interface TypeQuestionsDataI {
  questions: {
    question: {
      blankNumber?: number;
      displayNumber: string | any;
      options?: [];
      questionText?: string;
      _id: string;
    };
    questionId: string;
    studentAnswer: string;
  }[];
}
export interface contentQuestionItemI {
  blankNumber?: number;
  displayNumber: string | any;
  options?: [];
  questionText?: string;
  _id: string;
}
export interface QuestionItemI {
  question: contentQuestionItemI;
  questionId: string;
  studentAnswer: string;
}

export interface PartContentQuestionsI extends TypeQuestionsDataI {
  directionText: string;
  groupNumber: number;
  image: string;
  questionBox?: string;
  questionType: string;
  answerList?: any;
  _id: string;
}

export interface AllQuestionsDataI {
  groups: PartContentQuestionsI[];
  partAudio: string;
  partNumber: number;
  _id: string;
}
