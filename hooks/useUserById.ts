import useSWR from "swr";
import fetcher from "@/libs/fetcher";

export const useUserById = (userId: string) => {
  const url = `/api/users/byId/${userId}`;
  const { data, error, mutate, isLoading } = useSWR(url, fetcher);
  return {
    data,
    error,
    mutate,
    isLoading,
  };
};
