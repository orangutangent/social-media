'use client'

import { usePost } from "@/hooks/usePost";
import CommentItem from "./CommentItem";
import Button from "../ui/Button";
import TextareaAutosize from "react-textarea-autosize";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useComment } from "@/hooks/useComment";
import { comment } from "postcss";
import { Comment } from "@prisma/client";
import useCurrentUser from "@/hooks/useCurrentUser";

interface Props {
    postId: string
}

type TCommentItem = Partial<Comment> 


const CommentBoard:React.FC<Props> = ({postId}) => {
    const {data: currentUser} = useCurrentUser();
    const {createComment, getComments} = useComment(postId);
    const [comments, setComments] = useState<TCommentItem[] >([]);
    useEffect(() => {
        getComments().then((data) => {
            setComments(data);
        })
    }, [postId])
    const [newComment, setNewComment] = useState("");
    return (  
        
        <motion.div
            initial={{ opacity: 0, y: "-100px", scaleY: 0 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: "-100px", scaleY: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className=" ps-10 w-full pe-4 md:pe-0">
                <AnimatePresence>
                     <div className="flex flex-col gap-4">
                        {comments?.map((comment: any) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </div>
                </AnimatePresence>
            <div className="mt-4">
                <div className="flex flex-col items-end">
                <TextareaAutosize
                    value={newComment} onChange={(e) => setNewComment(e.target.value)}
                    minRows={4}  className="resize-none border-2 rounded-xl border-slate-700 w-full 
                    bg-transparent outline-none text-white p-4 " 
                    placeholder="Write a comment..." />
                <Button 
                 onClick={() => {
                    if (!newComment) return;
                    setComments([{
                        body: newComment,
                        id: Date.now().toString(),
                        userId: currentUser?.id,
                    }, ...comments]);
                    createComment(newComment)
                    setNewComment("")

                 }}
                 isSmall actionLabel="Comment" className="mt-4" />
                </div>
            </div>
        </motion.div>
    );
}
 
export default CommentBoard;