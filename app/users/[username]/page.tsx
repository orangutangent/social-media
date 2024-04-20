"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserPosts from "@/hooks/useUserPosts";
import PostFeed from "@/components/post/PostFeed";
import useUser from "@/hooks/useUser";
import UserBio from "@/components/user/UserBio";

const UserPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(username);
  const { data: posts, isLoading } = useUserPosts(fetchedUser?.id);
  if (fetchedUser && fetchedUser.username) {
    return (
      <div>
        <UserBio user={fetchedUser} />
        <div className="mt-4">
          <PostFeed posts={posts} isLoading={isLoading} username={username} />
        </div>
      </div>
    );
  }
};

export default UserPage;
