/*
  Warnings:

  - Changed the type of `education` on the `Intern` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Intern" DROP COLUMN "education",
ADD COLUMN     "education" JSONB NOT NULL;
