export enum TypeExamEnum {
  LISTENING = "LISTENING",
  WRITING = "WRITING",

  READING = "READING",
  SPEAKING = "SPEAKING",
}

export enum TypeStepExamEnum {
  STEP1 = "STEP1",
  STEP2 = "STEP2",
  STEP3 = "STEP3",
}

export interface Package {
  id: string;
}

export interface Student {
  id: string;
  name: string;
  gender: string;
  packages: Package;
}

export enum AnswerBoolean {
  TRUE = "TRUE",
  FALSE = "FALSE",
  NOTGIVEN = "NOT GIVEN",
}
