/*
  Warnings:

  - Changed the type of `movieId` on the `Bookmark` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_movieId_key" ON "Bookmark"("userId", "movieId");
