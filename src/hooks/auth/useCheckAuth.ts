import { authActions } from "redux/creators/modules/auth";
import { useEffect } from "react";
import useSagaCreators from "hooks/useSagaCreators";

export const useCheckAuth = () => {
  const { dispatch } = useSagaCreators();
  useEffect(() => {
    dispatch(authActions.checkAuth);
  }, [dispatch]);
};
