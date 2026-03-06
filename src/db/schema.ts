import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["female", "male"]);
export const exerciseStatusEnum = pgEnum("exercises_status", [
  "TODO",
  "STARTED",
  "DONE",
]);

/*
 Tables
*/
export const userTypes = pgTable("user_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  gender: genderEnum("gender").default("male"),
  userTypeId: uuid("user_type_id")
    .notNull()
    .references(() => userTypes.id),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  dateOfBirth: date("date_of_birth").default("1988-02-17"),
  height: integer("height").default(75),
  weight: integer("weight").default(180),
  isActive: boolean("is_active").default(true).notNull(),
  isVerified: boolean("is_verified").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lockedUntil: timestamp("locked_until"),
});

export type newUser = typeof users.$inferInsert;

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

export const exercises = pgTable("exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type NewExercise = typeof exercises.$inferInsert;

export const userExercises = pgTable(
  "user_exercises",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    taskId: uuid("task_id")
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    status: exerciseStatusEnum("status").notNull().default("TODO"),
    durationSeconds: integer("duration_seconds").notNull().default(15),
    load: integer("load").notNull().default(10),
    unit: text("unit").notNull().default("kg"),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    lastActivityAt: timestamp("last_activity_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [primaryKey({ columns: [t.userId, t.taskId] })],
);

export type NewUserExercise = typeof userExercises.$inferInsert;
export type UserExercise = typeof userExercises.$inferSelect;

export type UserExerciseWithExercise = {
  user_exercises: UserExercise;
  exercises: typeof exercises.$inferSelect;
};

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
  userExercises: many(userExercises),
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

export const exercisesRelations = relations(exercises, ({ many }) => ({
  userExercises: many(userExercises),
}));

export const userExercisesRelations = relations(userExercises, ({ one }) => ({
  user: one(users, {
    fields: [userExercises.userId],
    references: [users.id],
  }),
  exercise: one(exercises, {
    fields: [userExercises.taskId],
    references: [exercises.id],
  }),
}));
