CREATE TYPE "public"."gender" AS ENUM('female', 'male');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_verified" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender" "gender";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "height" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "weight" integer;