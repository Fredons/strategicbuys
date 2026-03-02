-- CreateEnum
CREATE TYPE "EnquiryPriority" AS ENUM ('HOT', 'WARM', 'COLD');

-- AlterTable: Add priority and followUpSentAt to enquiries
ALTER TABLE "enquiries" ADD COLUMN "priority" "EnquiryPriority" NOT NULL DEFAULT 'COLD';
ALTER TABLE "enquiries" ADD COLUMN "followUpSentAt" TIMESTAMP(3);

-- AlterTable: Add notificationEmails to site_settings
ALTER TABLE "site_settings" ADD COLUMN "notificationEmails" TEXT;

-- CreateIndex
CREATE INDEX "enquiries_priority_idx" ON "enquiries"("priority");
