
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"location" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	 "userId": integer("user_id").references(() => users.id),
	"crop" text NOT NULL,
	"disease" text NOT NULL,
	"confidence" integer NOT NULL,
	"severity" text NOT NULL,
	"status" text NOT NULL,
	"advisory" text NOT NULL,
	"temperature" integer,
	"humidity" integer,
	"rainfall" integer,
	"created_at" timestamp DEFAULT now()
);