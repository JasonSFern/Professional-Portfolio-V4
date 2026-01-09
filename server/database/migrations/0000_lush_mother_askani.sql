CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"title" varchar(200) NOT NULL,
	"pronouns" varchar(50) NOT NULL,
	"motto" jsonb NOT NULL,
	"location" jsonb NOT NULL,
	"bio" jsonb NOT NULL,
	"services" jsonb NOT NULL,
	"ethos" jsonb NOT NULL,
	"contact" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_code" varchar(100) NOT NULL,
	"category" varchar(100) NOT NULL,
	"title" varchar(200) NOT NULL,
	"subtitle" varchar(300) NOT NULL,
	"contents" jsonb NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"display_theme" varchar(100) NOT NULL,
	"photos" jsonb NOT NULL,
	"skills" jsonb NOT NULL,
	"links" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_project_code_unique" UNIQUE("project_code")
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"icon" varchar(100) NOT NULL,
	"proficiency" integer NOT NULL,
	"category" varchar(50) NOT NULL,
	"is_active" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
