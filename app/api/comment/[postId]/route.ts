import { NextRequest,NextResponse } from "next/server";

import prisma from "@/libs/db";
import serverAuth from "@/libs/serverAuth";

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;
        if (!postId || typeof postId !== "string") {
            throw new Error("Invalid ID");
        }
        const {currentUser} = await serverAuth();
        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { body } = await request.json();
        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId: postId,
            },
        });
        return NextResponse.json(comment);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;
        if (!postId || typeof postId !== "string") {
            throw new Error("Invalid ID");
        }
        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(comments);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
