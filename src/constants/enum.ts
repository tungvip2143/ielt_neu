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
  STEP4 = "STEP4",
  STEP5 = "STEP5",
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

export const examSemester = [
  { id: 1, label: "Level 1" },
  { id: 2, label: "Level 2" },
  { id: 3, label: "Level 3" },
  { id: 4, label: "Level 4" },
  { id: 5, label: "Level 5" },
];
