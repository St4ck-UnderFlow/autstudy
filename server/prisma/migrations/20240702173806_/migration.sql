/*
  Warnings:

  - Changed the type of `degreeLevel` on the `Teacher` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DegreeLevel" AS ENUM ('BACHELORS', 'MASTERS', 'PHD', 'POSTDOC');

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "degreeLevel",
ADD COLUMN     "degreeLevel" "DegreeLevel" NOT NULL;

-- DropEnum
DROP TYPE "DeggreeLevel";
