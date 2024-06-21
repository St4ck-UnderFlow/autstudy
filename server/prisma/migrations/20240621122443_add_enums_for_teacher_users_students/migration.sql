/*
  Warnings:

  - Changed the type of `userTypes` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `supportLevel` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `degreeLevel` on the `Teacher` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeggreeLevel" AS ENUM ('ASSOCIATE', 'BACHELORS', 'MASTERS', 'GRADUATE', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "SupportLevel" AS ENUM ('SLIGHT', 'MODERATE', 'SEVERE');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "userTypes",
ADD COLUMN     "userTypes" "UserType" NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "supportLevel",
ADD COLUMN     "supportLevel" "SupportLevel" NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "degreeLevel",
ADD COLUMN     "degreeLevel" "DeggreeLevel" NOT NULL;
