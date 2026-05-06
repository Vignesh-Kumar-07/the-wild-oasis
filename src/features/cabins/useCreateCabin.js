import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    //both are same
    // mutationFn:newCabin => createCabin(newCabin)

    mutationFn: createEditCabin,
    onSuccess: function () {
      toast.success(" Cabin created successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      
    },
    onError: () => {
      toast.error("Error in creating new cabin.");
    },
  });

  return { createCabin, isCreating };
}
