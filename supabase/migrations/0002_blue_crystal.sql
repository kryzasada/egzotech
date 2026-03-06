CREATE TYPE "public"."exercises_status" AS ENUM('TODO', 'STARTED', 'DONE');--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_exercises" (
	"user_id" uuid NOT NULL,
	"task_id" uuid NOT NULL,
	"status" "exercises_status" DEFAULT 'TODO' NOT NULL,
	"duration_seconds" integer DEFAULT 15 NOT NULL,
	"slug" text NOT NULL,
	"unit" text DEFAULT 'kg' NOT NULL,
	"started_at" timestamp,
	"completed_at" timestamp,
	"last_activity_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_exercises_user_id_task_id_pk" PRIMARY KEY("user_id","task_id")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "gender" SET DEFAULT 'male';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "date_of_birth" SET DEFAULT '1988-02-17';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "height" SET DEFAULT 75;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "weight" SET DEFAULT 180;--> statement-breakpoint
ALTER TABLE "user_exercises" ADD CONSTRAINT "user_exercises_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_exercises" ADD CONSTRAINT "user_exercises_task_id_exercises_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;