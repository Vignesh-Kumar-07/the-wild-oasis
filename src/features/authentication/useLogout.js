/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiLogin";
import { replace, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading: isLogingOut } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      navigate("login", { replace: true });
      queryClient.removeQueries();
    },
    onError: () => {
      toast.error("User unable to logout");
    },
  });
  return { logout, isLogingOut };
}
