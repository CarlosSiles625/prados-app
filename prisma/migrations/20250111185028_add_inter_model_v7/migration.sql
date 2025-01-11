/*
  Warnings:

  - Changed the type of `born_place` on the `Intern` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Intern" DROP COLUMN "born_place",
ADD COLUMN     "born_place" JSONB NOT NULL;
