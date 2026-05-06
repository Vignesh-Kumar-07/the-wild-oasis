/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiLogin";

export function useSignUp() {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    // mutationFn: (data) => console.log(data),

    onSuccess: (user) => {
      //   console.log(user);
      toast.success(
        "Account created successfully, please verify the new account from user's email",
      );
    },
    onError: () => {
      toast.error("Error in creating Account");
    },
  });

  return { signUp, isSigningUp };
}
