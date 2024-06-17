import { usePost } from "./usePost";



export const useComment = (postId: string) => {
    const {data:fetchedPost, mutate: mutatePost} = usePost(postId);
    
    const getComments = async () => {
        const data = await fetch(`/api/comment/${postId}`);
        const comments = await data.json();
        return comments;
    }

    const createComment = async (body: string) => {
        try {
            const req = await fetch(`/api/comment/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({body}),
            });
            const data = await req.json();
            mutatePost();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    return {fetchedPost, createComment, getComments};
}

