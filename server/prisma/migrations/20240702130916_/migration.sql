/*
  Warnings:

  - The values [ASSOCIATE,GRADUATE,PROFESSIONAL] on the enum `DeggreeLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeggreeLevel_new" AS ENUM ('BACHELORS', 'MASTERS', 'PHD', 'POSTDOC');
ALTER TABLE "Teacher" ALTER COLUMN "degreeLevel" TYPE "DeggreeLevel_new" USING ("degreeLevel"::text::"DeggreeLevel_new");
ALTER TYPE "DeggreeLevel" RENAME TO "DeggreeLevel_old";
ALTER TYPE "DeggreeLevel_new" RENAME TO "DeggreeLevel";
DROP TYPE "DeggreeLevel_old";
COMMIT;
