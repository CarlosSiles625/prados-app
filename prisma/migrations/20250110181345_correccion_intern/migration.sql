/*
  Warnings:

  - Added the required column `isRural` to the `Intern` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Intern" ADD COLUMN     "isRural" BOOLEAN NOT NULL;
