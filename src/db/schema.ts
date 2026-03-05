import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/*
 Tables
*/
export const genderEnum = pgEnum("gender", ["female", "male"]);

export const userTypes = pgTable("user_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  // gender: genderEnum("gender"),
  userTypeId: uuid("user_type_id")
    .notNull()
    .references(() => userTypes.id),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  dateOfBirth: date("date_of_birth"),
  isActive: boolean("is_active").default(true).notNull(),
  isVerified: boolean("is_verified").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lockedUntil: timestamp("locked_until"),
});

export type NewUser = typeof users.$inferInsert;

export const userCredentials = pgTable("user_credentials", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type NewUserCredential = typeof userCredentials.$inferInsert;

export const loginAttempts = pgTable("login_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  count: integer("count").default(0).notNull(),
  successful: boolean("successful").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userSessions = pgTable("user_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  refreshTokenHash: text("refresh_token_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/*
 Relations between tables
*/
export const usersRelations = relations(users, ({ one, many }) => ({
  userType: one(userTypes, {
    fields: [users.userTypeId],
    references: [userTypes.id],
  }),
  credentials: many(userCredentials),
  sessions: many(userSessions),
}));

export const userTypesRelations = relations(userTypes, ({ many }) => ({
  users: many(users),
}));

export const userCredentialsRelations = relations(
  userCredentials,
  ({ one }) => ({
    user: one(users, {
      fields: [userCredentials.userId],
      references: [users.id],
    }),
  }),
);

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));
