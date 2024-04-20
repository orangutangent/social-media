import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import { useMemo } from "react";
import useUser from "./useUser";
import React from "react";

export default function useFollow(username: string) {
  const { data: CurrentUser, mutate: mutateCurrentUser } = useCurrentUser();
  if (!CurrentUser) return {};
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: fetchedUser, mutate: mutateUser } = useUser(username);
  if (!fetchedUser) return {};
  const userId = fetchedUser.id;
  const isFollowing = CurrentUser?.followingIds?.includes(userId);
  const toggleFollow = async () => {
    try {
      let request;
      setIsLoading(true);
      if (isFollowing) {
        request = await axios.delete(`/api/follow`, { data: { userId } });
      } else {
        request = await axios.post(`/api/follow`, { userId });
      }
      mutateCurrentUser();
      mutateUser();
      setIsLoading(false);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { isFollowing, toggleFollow, isLoading };
}
