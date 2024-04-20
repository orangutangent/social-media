export const dynamic = "force-dynamic";
import { NextResponse, NextRequest } from "next/server";
import serverAuth from "@/libs/serverAuth";

export async function GET(request: NextRequest) {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
