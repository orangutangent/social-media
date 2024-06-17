import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import { useLoginModal } from "./useLoginModal";
import useUserPosts from "./useUserPosts";
import toast from "react-hot-toast";
import { usePost } from "./usePost";



export const useLike = (postId: string): {isLiked: boolean, likeCount: number, toggleLike: () => void} => {
    const { data: currentUser } = useCurrentUser();
    const {mutate: mutatePosts} = useUserPosts(currentUser?.id);
    const {data:fetchedPost, mutate: mutatePost} = usePost(postId);

    const loginModal = useLoginModal();

    if (!currentUser) {
        toast.error("You must be logged in");
        loginModal.setOpen();
        return {
            likeCount: 0,
            isLiked: false,
            toggleLike: () => {}
        };
    }
    if (!fetchedPost) {
        return {
            likeCount: 0,
            isLiked: false,
            toggleLike: () => {}
        }
    }
    const likeCount = fetchedPost.likedIds?.length || 0;
    const isLiked = fetchedPost.likedIds?.includes(currentUser.id);

    const toggleLike = async () => {
        try{
            const req = await axios.post(`/api/like/${postId}`);
            mutatePosts();
            mutatePost();
            return req;
        }catch(error){
            toast.error("Something went wrong");
        }
        
    }
    return {
        likeCount,
        isLiked,
        toggleLike
    }
    
}