CREATE TYPE "public"."approval_confidence" AS ENUM('high', 'good', 'fair');--> statement-breakpoint
CREATE TYPE "public"."credit_score" AS ENUM('no_credit', 'below_500', '500_549', '550_599', '600_649', '650_699', '700_plus');--> statement-breakpoint
CREATE TYPE "public"."employment_status" AS ENUM('employed', 'self_employed', 'retired', 'disability', 'other');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('partial', 'submitted', 'matched', 'no_match', 'contacted', 'sold');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."vehicle_type" AS ENUM('new', 'used', 'refinance', 'unsure');--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" varchar(36) NOT NULL,
	"vehicleType" "vehicle_type" NOT NULL,
	"estimatedPrice" integer,
	"creditScore" "credit_score" NOT NULL,
	"hasBankruptcy" boolean DEFAULT false,
	"hasRepossession" boolean DEFAULT false,
	"employmentStatus" "employment_status",
	"monthlyIncome" integer,
	"firstName" varchar(64),
	"lastName" varchar(64),
	"email" varchar(320),
	"phone" varchar(20),
	"zipCode" varchar(10),
	"state" varchar(2),
	"trustedFormCertUrl" text,
	"ipAddress" varchar(45),
	"userAgent" text,
	"tcpaConsentText" text,
	"utmSource" varchar(128),
	"utmMedium" varchar(128),
	"utmCampaign" varchar(128),
	"landingPage" text,
	"abandonedAtStep" integer,
	"status" "lead_status" DEFAULT 'partial' NOT NULL,
	"leadSoldAt" timestamp,
	"saleValue" numeric(8, 2),
	"soldToLenderId" integer,
	"webhookToken" varchar(64),
	"isTest" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "leads_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "lender_offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"leadId" integer NOT NULL,
	"lenderId" integer NOT NULL,
	"pingAccepted" boolean DEFAULT false NOT NULL,
	"pingBid" numeric(8, 2),
	"pingResponseMs" integer,
	"pingRawResponse" json,
	"postSent" boolean DEFAULT false NOT NULL,
	"postAccepted" boolean DEFAULT false NOT NULL,
	"postRawResponse" json,
	"lenderName" varchar(128),
	"lenderLogoUrl" text,
	"aprMin" numeric(5, 2),
	"aprMax" numeric(5, 2),
	"estimatedMonthlyPayment" numeric(8, 2),
	"termMonths" integer,
	"approvalConfidence" "approval_confidence",
	"isBestMatch" boolean DEFAULT false NOT NULL,
	"selectedByBorrower" boolean DEFAULT false NOT NULL,
	"selectedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lenders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"slug" varchar(64) NOT NULL,
	"logoUrl" text,
	"pingUrl" text,
	"postUrl" text,
	"apiKey" text,
	"pingFieldMap" json,
	"postFieldMap" json,
	"isActive" boolean DEFAULT true NOT NULL,
	"priority" integer DEFAULT 10 NOT NULL,
	"maxBid" numeric(8, 2),
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "lenders_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"passwordHash" text,
	"loginMethod" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
