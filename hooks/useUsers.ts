import useSWR from "swr";
import fetcher from "@/libs/fetcher";

export const useUsers = (followedBy?: string) => {
  const url = followedBy ? `/api/users?followedBy=${followedBy}` : "/api/users";
  const { data, error, mutate, isLoading } = useSWR(url, fetcher);
  return {
    data,
    error,
    mutate,
    isLoading,
  };
};
