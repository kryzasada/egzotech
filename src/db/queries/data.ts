"use server";

import { db } from "@/db";
import { NewUser, userCredentials, userTypes, users } from "@/db/schema";
import { requireUser } from "@/lib/requireUser";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const getUserProfile = async () => {
  const { session } = await requireUser();

  const result = await db
    .select({
      user: users,
      userType: userTypes,
      credentials: { email: userCredentials.email },
    })
    .from(users)
    .innerJoin(userCredentials, eq(users.id, userCredentials.userId))
    .innerJoin(userTypes, eq(users.userTypeId, userTypes.id))
    .where(eq(userCredentials.email, session.user.email!));

  return result[0];
};

export const updateUserData = async (userData: Partial<NewUser>) => {
  const { userId } = await requireUser();

  return await db.update(users).set(userData).where(eq(users.id, userId));
};

export const updateUserCredentials = async (userPassword: string) => {
  const { userId } = await requireUser();

  const hashedPassword = await hash(userPassword, 10);

  return await db
    .update(userCredentials)
    .set({ password: hashedPassword })
    .where(eq(userCredentials.userId, userId));
};
