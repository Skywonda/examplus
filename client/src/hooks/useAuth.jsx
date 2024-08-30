import { useNavigate } from "react-router-dom";
import { api } from "utils/api";

export const useAuth = () => {
  const { isLoading, data, refetch, isSuccess, isError } = api.useGet(
    "auth/me",
    {
      enabled: !!localStorage.getItem("access_token"),
      retry: 0,
    }
  );
  const navigate = useNavigate();

  const login = (payload) => {
    localStorage.setItem("access_token", payload.token);
    return refetch();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
  };

  const ensureIsNotAuthenticated = () => {
    if (isSuccess) {
      if (data.type === "STUDENT") {
        navigate("/");
      } else {
        navigate("/manage");
      }
    }
  };

  return {
    user: data,
    isLoading,
    isSuccess,
    authCheck: refetch,
    ensureIsNotAuthenticated,
    isError,
    login,
    logout,
  };
};
