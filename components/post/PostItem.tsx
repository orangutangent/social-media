"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import Container from "../Container";
import UserAvatar from "../user/UserAvatar";
import { useUserById } from "@/hooks/useUserById";
import { useLike } from "@/hooks/useLike";
import { usePost } from "@/hooks/usePost";
import CommentBoard from "../comment/CommentBoard";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useComment } from "@/hooks/useComment";
interface Props {
  title: string;
  body: string;
  id: string;
  userId: string;
}

const PostItem: React.FC<Props> = ({ title, body, id, userId }) => {
  const { getComments} = useComment(id);
  const [commentsCount, setCommentsCount] = useState(0)
  useEffect(() => {
    getComments().then((data) => {
      setCommentsCount(data.length)
    })
  },[])
  const [ openCommentBoard, setOpenCommentBoard ] = useState(false); 
  const { isLiked, toggleLike, likeCount } = useLike(id);
  const { data: user } = useUserById(userId);
  const { data: currentUser } = useCurrentUser();

  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 w-min mx-auto">
      <Container>
        <div className="flex gap-4 m-4 items-center">
          <div className="flex flex-col">
            <UserAvatar user={user} />
          </div>
          <div className="flex flex-col ">
            <p
              onClick={() => router.push(`/users/${user?.username}`)}
              className={`rounded-xl text-md cursor-pointer hover:underline 
                ${
                  user?.id === currentUser?.id
                    ? "text-emerald-500"
                    : "text-indigo-500"
                }
            `}
            >
              @{user?.username}
            </p>
            <h1 className="text-xl">{title}</h1>
          </div>
        </div>
        <div className=" border-b-2 border-slate-600  m-4"></div>
        <div className="m-4 w-auto rounded-xl p-2">{body}</div>
        <div className="flex justify-start gap-10 my-4 ms-8">
          <div className="flex gap-2">
            {likeCount>0 && <p>{likeCount}</p>}
            <button
              onClick={toggleLike}
            className={`text-xl hover:scale-105 hover:text-emerald-500 duration-100 spring-50 ${isLiked && "text-emerald-500"}`} 
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:scale-105 duration-100 spring-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-2">
            {commentsCount>0 && <p>{commentsCount}</p>}          
          <button
            onClick={() => setOpenCommentBoard(!openCommentBoard)}
              className={`hover:text-rose-500 hover:scale-105 duration-100 spring-50  ${openCommentBoard && "text-rose-500"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </button>
          </div>
        </div>
      </Container>
        <AnimatePresence>
        { openCommentBoard &&
          <CommentBoard postId={id} />
        }
        </AnimatePresence>
    </div>
  );
};

export default PostItem;
