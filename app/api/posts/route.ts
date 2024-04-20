import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import serverAuth from "@/libs/serverAuth";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const followedBy = searchParams.get("followedBy");
    let posts;
    if (userId && typeof userId === "string") {
      posts = await prisma.post.findMany({
        where: {
          userId: userId,
        },
      });
    } else if (followedBy && typeof followedBy === "string") {
      const user = await prisma.user.findUnique({
        where: {
          id: followedBy,
        },
      });
      posts = await prisma.post.findMany({
        where: {
          userId: {
            in: user?.followingIds,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany();
    }
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
export async function POST(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth();
    const body = await req.json();
    const post = await prisma.post.create({
      data: {
        title: body.title,
        body: body.body,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
