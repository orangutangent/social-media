import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/db";
import serverAuth from "@/libs/serverAuth";

export async function POST(request: NextRequest, {params}: {params: {postId: string}}) {
    try {
        const {currentUser} = await serverAuth();
        const {postId} = params;

        let post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return new NextResponse("Invalid ID", {status: 400});
        }

        const isLiked = post.likedIds.includes(currentUser.id);
         
        if (isLiked) {
            post = await prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    likedIds: post.likedIds.filter((likedId) => likedId !== currentUser.id)
                }
            })
        }else{
           post = await prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    likedIds: {
                        push: currentUser.id
                    }
                }
            })
        }
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

