import { Comment } from "@prisma/client";
import UserAvatar from "../user/UserAvatar";
import { useUserById } from "@/hooks/useUserById";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { motion } from "framer-motion";

interface Props {
    comment: Comment
}

const CommentItem:React.FC<Props> = ({comment}) => {
    const router = useRouter();
    const {data:currentUser} = useCurrentUser()
    const {data: user} = useUserById(comment.userId)
    return ( 
        <motion.div 
            initial={{ opacity: 0, x: "-100px",  }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100px" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex  border-2 border-slate-700 rounded-2xl p-4">

            <div>
                <UserAvatar user={user} />
            </div>
            <div className="flex flex-col gap-2 ml-4">
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
                <p>{comment.body}</p>
            </div>
        </motion.div>
     );
}
 
export default CommentItem;