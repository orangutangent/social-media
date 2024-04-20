import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUserPosts = (userId: string) => {
  const url = `/api/posts?userId=${userId}`;
  const { data, error, mutate, isLoading } = useSWR(url, fetcher);
  return {
    data,
    error,
    mutate,
    isLoading,
  };
};

export default useUserPosts;
