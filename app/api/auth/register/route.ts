import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const existedEmail = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (existedEmail) {
      return NextResponse.json({ error: "Email already exists" });
    }
    const existedUsername = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if (existedUsername) {
      return NextResponse.json({ error: "Username already exists" });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        hashedPassword: await bcrypt.hash(body.password, 12),
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
