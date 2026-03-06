ALTER TABLE "users" ALTER COLUMN "height" SET DEFAULT 170;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "weight" SET DEFAULT 75;--> statement-breakpoint
ALTER TABLE "login_attempts" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "login_attempts" ADD CONSTRAINT "login_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;