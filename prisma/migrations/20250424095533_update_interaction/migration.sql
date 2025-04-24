/*
  Warnings:

  - Added the required column `userId` to the `interactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interactions" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
