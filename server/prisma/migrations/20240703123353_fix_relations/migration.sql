/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_teacherId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "teacherId";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
