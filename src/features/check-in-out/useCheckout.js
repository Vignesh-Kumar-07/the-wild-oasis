/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingout, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is checked-out successfully`);
      queryClient.invalidateQueries({
        // queryKey: ["bookings"],
        active: true,
      });
    },
    onError: () => toast.error("Error in checking out."),
  });
  return { isCheckingout, checkout };
}
