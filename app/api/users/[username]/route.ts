import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    if (!username || typeof username !== "string") {
      throw new Error("Invalid ID");
    }
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        posts: true,
        comments: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        ...user,
      })
    );
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    if (!username || typeof username !== "string") {
      throw new Error("Invalid ID");
    }
    const body = await req.json();
    const user = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        ...body,
      },
    });
    return new NextResponse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
