import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Error in updating user account");
    },
  });
  return { updateUser, isUpdating };
}
