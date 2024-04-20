"use client";
import CreatePost from "@/components/post/CreatePost";
import useCurrentUser from "@/hooks/useCurrentUser";
import PostItem from "@/components/post/PostItem";
import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Home() {
  const { user: currentUser } = useSession().data || {};
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts?followedBy=" + currentUser?.id);
      return res.data;
    };
    try {
      if (!currentUser) {
        setPosts([]);
        return;
      }
      fetchPosts().then((data) => {
        setPosts(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);
  return (
    <div>
      <CreatePost />
      <div>
        {posts?.map((post: any) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
          />
        ))}
      </div>
    </div>
  );
}
