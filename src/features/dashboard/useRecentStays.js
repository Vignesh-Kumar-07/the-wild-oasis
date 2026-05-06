import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numOfDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numOfDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `stays-${numOfDays}`],
  });

  // const confirmedStays = stays?.filter((el) => el.status !== "unconfirmed");
  const confirmedStays = stays?.filter(
    (el) => el.status == "checked-in" || el.status === "checked-out",
  );

  return { stays, isLoading, confirmedStays, numOfDays };
}
