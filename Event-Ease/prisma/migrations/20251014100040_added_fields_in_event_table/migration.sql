-- CreateEnum
CREATE TYPE "public"."Type" AS ENUM ('Private', 'Global');

-- AlterTable
ALTER TABLE "public"."event" ADD COLUMN     "bannerImage" TEXT,
ADD COLUMN     "type" "public"."Type" NOT NULL DEFAULT 'Private';
