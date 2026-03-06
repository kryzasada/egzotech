import { getServerSession } from "next-auth/next";
import { UNAUTHORIZED } from "@/consts";
import { authOptions } from "@/lib/auth";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error(UNAUTHORIZED);
  }
  return { userId: session.user.id, session };
}
