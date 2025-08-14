/*
  Warnings:

  - Added the required column `updatedAt` to the `settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `social_medias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `unit_companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "social_medias" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "unit_companies" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
