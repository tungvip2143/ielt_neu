import { AUTH_URL } from "constants/api";
import httpServices from "services/httpServices";

const USER_LOCAL_STORAGE = "auth";
class AuthService {
  signUp(body: any) {
    return httpServices.post(AUTH_URL.SIGNUP, body);
  }

  verifyEmail(body: any, accessToken: any) {
    return httpServices.post(AUTH_URL.VERIFY_EMAIL, body, { headers: { Authorization: `Bearer ${accessToken}` } });
  }

  forgotPassword(body: any) {
    return httpServices.post(AUTH_URL.FORGOT_PASSWORD, body);
  }

  verifyCode(body: any) {
    return httpServices.post(AUTH_URL.VERIFY_CODE, body);
  }

  resetPassword(body: any) {
    return httpServices.post(AUTH_URL.RESET_PASSWORD, body);
  }

  resendCode(accessToken: any) {
    return httpServices.post(AUTH_URL.RESEND_CODE, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
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
