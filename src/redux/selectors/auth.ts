import { useSelector } from "react-redux";

export const GetAuthSelector = () => {
  const auth = useSelector((state: any) => state.authReducer.auth);
  console.log("auth", auth);
  if (auth) {
    return auth;
  }
};
