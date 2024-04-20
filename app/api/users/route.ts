import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const followedBy = searchParams.get("followedBy");
    let users;
    if (followedBy && typeof followedBy === "string") {
      users = await prisma.user.findMany({
        where: {
          followersIds: {
            has: followedBy,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      users = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
