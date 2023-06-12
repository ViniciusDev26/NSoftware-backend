/*
  Warnings:

  - Added the required column `AccountId` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_addressId_fkey";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "AccountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
