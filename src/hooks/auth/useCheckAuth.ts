import { RouteBase } from "constants/routeUrl";
import { authActions } from "redux/creators/modules/auth";
import { useEffect } from "react";
import useSagaCreators from "hooks/useSagaCreators";
import { GetAuthSelector } from "redux/selectors";
import { Redirect, useHistory } from "react-router-dom";

export const useCheckAuth = () => {
  const { dispatch } = useSagaCreators();
  const auth = GetAuthSelector();

  useEffect(() => {
    dispatch(authActions.checkAuth);
  }, [dispatch]);
};
