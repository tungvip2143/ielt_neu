export const RouteBase = {
  Home: "/",
  Ielts: "/ielts",
  Login: "/login",
  LoginEmail: "/login/email",
  SignUp: "/login/sign-up",
  IeltsListening: "/ielts/listening",
  IeltsReading: "/ielts/reading",
  IeltsWriting: "/ielts/writing",
  IeltsSpeaking: "/ielts/speaking",
  Pricing: "/pricing",
  ReviewReading: "/ielts/review/reading/:testCode",
  WritingReview: "/ielts/review/writing/:testCode",
  ListeningReview: "/ielts/review/listening/:testCode",
  Admin: "/admin",
  AdminLogin: "/admin/login",
  AdminDashboard: "/admin/dashboard",
  ExamManagement: "/admin/exammagement",
  //User
  AdminUser: "/admin/user",
  CreateUser: "/admin/userbank/user/create",
  UpdateUser: "/admin/userbank/user/:id",
  UpdateUserWID: (id: string | number) => `/admin/userbank/user/${id}`,
  //Listening
  Listening: "/admin/listening",
  CreateListening: "/admin/questionbank/listening/create",
  UpdateListening: "/admin/questionbank/listening/:id",
  UpdateListeningWId: (id: string | number) => `/admin/questionbank/listening/${id}`,

  //Speaking
  Speaking: "/admin/speaking",
  CreateSpeaking: "/admin/questionbank/speaking/create",
  UpdateSpeaking: "/admin/questionbank/speaking/:id",
  UpdateSpeakingWId: (id: string | number) => `/admin/questionbank/speaking/${id}`,

  //Writing
  Writing: "/admin/writing",
  CreateWriting: "/admin/questionbank/writing/create",
  UpdateWriting: "/admin/questionbank/writing/:id",
  UpdateWritingWId: (id: string | number) => `/admin/questionbank/writing/${id}`,

  //Reading
  Reading: "/admin/reading",
  CreateReading: "/admin/questionbank/reading/create",
  UpdateReading: "/admin/questionbank/reading/:id",
  UpdateReadingWId: (id: string | number) => `/admin/questionbank/reading/${id}`,

  //Contest
  ContestManagement: "/admin/contestManagement",
  CreateContestManagement: "/admin/contestManagement/create",

  //Static
  StaticManagement: "/admin/staticManagement",
};
