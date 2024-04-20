import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: params.postId,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const body = await request.json();
    const post = await prisma.post.update({
      where: {
        id: params.postId,
      },
      data: body,
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const body = await request.json();
    const post = await prisma.post.create({
      data: body,
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
