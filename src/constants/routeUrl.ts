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
  CreateUser: "/admin/user/create",
  UpdateUser: "/admin/user/:id",
  UpdateUserWID: (id: string | number) => `/admin/user/${id}`,
  //Listening
  Listening: "/admin/listening",
  CreateListening: "/admin/listening/create",
  UpdateListening: "/admin/listening/:id",
  UpdateListeningWId: (id: string | number) => `/admin/listening/${id}`,

  //Speaking
  Speaking: "/admin/speaking",
  CreateSpeaking: "/admin/speaking/create",
  UpdateSpeaking: "/admin/speaking/:id",
  UpdateSpeakingWId: (id: string | number) => `/admin/speaking/${id}`,

  //Writing
  Writing: "/admin/writing",
  CreateWriting: "/admin/writing/create",
  UpdateWriting: "/admin/writing/:id",
  UpdateWritingWId: (id: string | number) => `/admin/writing/${id}`,

  //Reading
  Reading: "/admin/reading",
  CreateReading: "/admin/reading/create",
  UpdateReading: "/admin/reading/:id",
  UpdateReadingWId: (id: string | number) => `/admin/reading/${id}`,

  //Contest
  ContestManagement: "/admin/contestManagement",
  CreateContestManagement: "/admin/contestManagement/create",

  //Static
  StaticManagement: "/admin/staticManagement",
};
