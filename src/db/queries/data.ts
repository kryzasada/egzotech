"use server";

import { db } from "@/db";
import { userCredentials, userTypes, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUser = async () => {
  return await db.select().from(users).limit(1);
};

export const getUserProfile = async (email: string) => {
  const result = await db
    .select({
      user: users,
      userType: userTypes,
    })
    .from(users)
    .innerJoin(userCredentials, eq(users.id, userCredentials.userId))
    .innerJoin(userTypes, eq(users.userTypeId, userTypes.id))
    .where(eq(userCredentials.email, email));

  return result[0];
};
