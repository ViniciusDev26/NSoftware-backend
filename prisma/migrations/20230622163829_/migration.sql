/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `favorites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_favoriteId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "favoriteId";

-- AlterTable
ALTER TABLE "favorites" ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
