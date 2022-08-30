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
      if (!isEmpty(infoLocalStorage)) {
        const { token } = infoLocalStorage;
        yield httpServices.attachTokenToHeader(token);
        yield put({ type: authActions.saveInfoUser, payload: { token } });
      } else {
        yield put({ type: authActions.saveInfoUserFailed });
      }
    },
  },
  [authActions.logout]: {
    saga: function* ({ payload = {} }) {
      yield authServices.clearUserLocalStorage();
      window.location.reload();
    },
  },
  [authActions.saveInfoUser]: {
    saga: function* (action: any) {
      const { token, userType } = action.payload;
      yield httpServices.attachTokenToHeader(token);
      yield authServices.saveUserToLocalStorage({ token });
      yield authServices.saveUserTypeToLocalStorage(userType);
      yield put({ type: authActions.saveInfoUserSuccess, token });
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
    console.log("draftState", draftState);
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

      default:
        break;
    }
  });
};
