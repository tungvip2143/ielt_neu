import { AUTH_URL } from "constants/api";
import httpServices from "services/httpServices";

const USER_LOCAL_STORAGE = "auth";
class AuthService {
  signUp(body = { username: "", password: "" }) {
    return httpServices.post(AUTH_URL.SIGNUP, body);
  }

  login(body = { username: "", password: "" }) {
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
