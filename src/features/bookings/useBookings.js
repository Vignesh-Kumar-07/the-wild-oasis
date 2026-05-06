/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchQuery] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchQuery.get("status");
  // filter
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // : { field: "status", value: filterValue, metho: 'gte' };

  // sorting
  const sortValue = searchQuery.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  // pagination

  const page = !searchQuery.get("page") ? 1 : Number(searchQuery.get("page"));
  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ["bookings", filter, sortBy, page],
  });

  // PRE-FETCHING

  const pageCount = Math.ceil(count / PAGE_SIZE);
  // console.log(pageCount, page);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ["bookings", filter, sortBy, page + 1],
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ["bookings", filter, sortBy, page - 1],
    });
  }

  return { bookings, isLoading, count };
}
