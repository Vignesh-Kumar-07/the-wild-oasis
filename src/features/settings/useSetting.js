import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["setting"],
  });
  return { isLoading, error, settings };
}
