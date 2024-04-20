import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/db";

export async function POST(request: NextRequest) {
  try {
    const { currentUser } = await serverAuth();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { userId } = await request.json();
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const currUser = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });
    const followUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const followers = followUser?.followersIds || [];
    const following = currUser?.followingIds || [];
    if (!following?.includes(userId)) {
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          followingIds: [...following, userId],
        },
      });
    }
    if (!followers?.includes(userId)) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followersIds: [...followers, currentUser.id],
        },
      });
    }

    return new NextResponse(JSON.stringify(currUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { currentUser } = await serverAuth();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { userId } = await request.json();
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const currUser = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });
    const followUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const followers = followUser?.followersIds.filter(
      (id) => id !== currentUser.id
    );
    const following = currUser?.followingIds.filter((id) => id !== userId);
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: following,
      },
    });
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followersIds: followers,
      },
    });
    return new NextResponse(JSON.stringify(currUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
