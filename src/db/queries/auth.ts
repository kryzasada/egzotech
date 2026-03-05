"use server";

import { db } from "@/db";
import {
  NewUser,
  userCredentials,
  userSessions,
  userTypes,
  users,
} from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const getUserTypes = async () => {
  return await db.select().from(userTypes);
};

export const getUserByEmail = async (email: string) => {
  const result = await db
    .select({
      user: users,
      credentials: userCredentials,
    })
    .from(users)
    .innerJoin(userCredentials, eq(users.id, userCredentials.userId))
    .where(eq(userCredentials.email, email));

  return result[0];
};

export const createUserSession = async (
  userId: string,
  refreshTokenHash: string,
) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 10); // 10 days

  return await db.insert(userSessions).values({
    userId,
    refreshTokenHash,
    expiresAt,
  });
};

export const checkIfUserExists = async (email: string) => {
  return await db
    .select()
    .from(userCredentials)
    .where(eq(userCredentials.email, email))
    .then((result) => result.length > 0);
};

export const registerUser = async (
  userData: NewUser & { email: string; password: string },
) => {
  const { email, password, ...userInfo } = userData;

  const hashedPassword = await hash(password, 10);

  return await db.transaction(async (tx) => {
    const [newUser] = await tx.insert(users).values(userInfo).returning();

    await tx.insert(userCredentials).values({
      userId: newUser.id,
      email,
      password: hashedPassword,
    });

    return newUser;
  });
};
