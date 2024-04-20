import { getServerSession } from "next-auth";
import prisma from "@/libs/db";

export default async function getSession() {
  const session = await getServerSession();
  let currentUser;
  if (!session?.user) {
    throw new Error("Not signed in");
  }
  if (session?.user) {
    currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
  }
  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return { currentUser };
}
