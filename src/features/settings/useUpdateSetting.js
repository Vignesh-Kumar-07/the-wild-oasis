import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting Updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["setting"],
      });
    },
    onError: () => {
      toast.error("Error in updating setting");
    },
  });
  return { updateSetting, isUpdating };
}
