import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  const { data, error, mutate, isLoading } = useSWR(
    "/api/auth/current",
    fetcher
  );
  return {
    data,
    error,
    mutate,
    isLoading,
  };
};

export default useCurrentUser;
