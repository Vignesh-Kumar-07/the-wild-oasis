/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success(`Booking deleted successfully.`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error(`Error in deleting booking`);
    },
  });
  return { deleteBooking, isDeletingBooking };
}
