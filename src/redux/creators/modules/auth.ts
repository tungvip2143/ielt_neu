import cacheService from "services/cacheService";
import isEmpty from "lodash/isEmpty";
import produce from "immer";
import { put } from "redux-saga/effects";
import authServices from "services/authServices";
import httpServices from "services/httpServices";

export const authActions = {
  checkAuth: "checkAuth",
  logout: "logout",
  saveInfoUser: "saveInfoUser",
  saveInfoUserSuccess: "saveInfoUserSuccess",
  saveInfoUserFailed: "saveInfoUserFailed",
  saveUserType: "saveUserType",
};

export const authSagas = {
  [authActions.checkAuth]: {
    saga: function* ({ payload = {} }) {
      const infoLocalStorage = authServices.getUserLocalStorage();
      const userType = authServices.getUserTypeFromLocalStorage();

      if (!isEmpty(infoLocalStorage) && !isEmpty(userType)) {
        const { token } = infoLocalStorage;
        yield httpServices.attachTokenToHeader(token);
        yield put({ type: authActions.saveInfoUser, payload: { token, userType } });
      } else {
        yield put({ type: authActions.saveInfoUserFailed });
      }
    },
  },
  [authActions.logout]: {
    saga: function* ({ payload = {} }) {
      yield authServices.clearUserLocalStorage();
      yield cacheService.clearCacheData();
      // yield put({ type: authActions.logout });
      window.location.reload();
    },
  },
  [authActions.saveInfoUser]: {
    saga: function* (action: any) {
      const { token, userType, user } = action.payload;
      console.log("user", user);
      yield httpServices.attachTokenToHeader(token);
      yield authServices.saveUserToLocalStorage({ token });
      yield authServices.saveUserTypeToLocalStorage(userType);
      yield localStorage.setItem("userInfo", user);
      yield put({ type: authActions.saveInfoUserSuccess, token, user });
    },
  },
  // [authActions.saveUserType]: {
  //   saga: function* (action: any) {
  //     const { userType } = action;
  //     yield put({ type: authActions.saveUserType, userType });
  //   },
  // },
};

export const authReducer = (
  state = {
    auth: {
      token: "",
      user: {},
      isLogin: false,
      isCheckingAuth: false,
      error: null,
      userType: "user",
    },
  },
  action: any
) => {
  return produce(state, (draftState) => {
    console.log("action", action);
    switch (action.type) {
      case authActions.checkAuth: {
        draftState.auth.isCheckingAuth = true;
        break;
      }

      case authActions.saveInfoUserSuccess: {
        draftState.auth.isLogin = true;
        draftState.auth.isCheckingAuth = false;
        draftState.auth.token = action.token;
        draftState.auth.user = action.user;

        break;
      }

      case authActions.saveInfoUserFailed: {
        draftState.auth.isCheckingAuth = false;
        break;
      }

      case authActions.saveUserType: {
        draftState.auth.userType = action.userType;
        break;
      }

      case authActions.logout: {
        draftState.auth.isLogin = false;
        draftState.auth.token = "";
        break;
      }

      default:
        break;
    }
  });
};
