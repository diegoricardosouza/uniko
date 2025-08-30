/*
  Warnings:

  - Added the required column `name` to the `emails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emails" ADD COLUMN     "name" TEXT NOT NULL;
