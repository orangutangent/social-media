import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (username: string) => {
  const url = `/api/users/${username}`;
  const { data, error, mutate, isLoading } = useSWR(url, fetcher);
  return {
    data,
    error,
    mutate,
    isLoading,
  };
};

export default useUser;
