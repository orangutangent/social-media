import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
