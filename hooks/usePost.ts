import fetcher from "@/libs/fetcher";
import useSWR from "swr";



export const usePost = (postId: string) => {

    const url = `/api/posts/${postId}`

    const { data, error, mutate, isLoading } = useSWR(url, fetcher);
    return {
        data,
        error,
        mutate,
        isLoading,
    };
    
}