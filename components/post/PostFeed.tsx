"use client";
import PostItem from "./PostItem";

interface Props {
  posts: any;
  isLoading?: boolean;
  username?: string;
}

const PostFeed: React.FC<Props> = ({ posts, isLoading, username }) => {
  return (
    <div className="flex flex-col gap-4 w-full mx-auto">
      {posts && posts?.map((post: any) => (
        <PostItem
          key={post.id}
          userId={post.userId}
          body={post.body}
          title={post.title}
          id={post.id}
        />
      ))}
    </div>
  );
};

export default PostFeed;
