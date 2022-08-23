import { AUTH_URL } from "constants/api";
import httpServices from "services/httpServices";

const USER_LOCAL_STORAGE = "auth";
class AuthService {
  signUp(body: any) {
    return httpServices.post(AUTH_URL.SIGNUP, body);
  }

  login(body = { email: "", password: "" }) {
    return httpServices.post(AUTH_URL.LOGIN, body);
  }

  logout(body = {}) {
    return httpServices.post(AUTH_URL.LOGOUT, body);
  }

  saveUserToLocalStorage(body = {}) {
    localStorage.setItem(USER_LOCAL_STORAGE, JSON.stringify(body));
  }

  getUserLocalStorage() {
    const user = localStorage.getItem(USER_LOCAL_STORAGE);
    console.log("ssssssssss", user);

    if (!!user) {
      return JSON.parse(user);
    }
    return {};
  }

  clearUserLocalStorage() {
    localStorage.removeItem(USER_LOCAL_STORAGE);
  }
}

export default new AuthService();
