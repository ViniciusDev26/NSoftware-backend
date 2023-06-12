/*
  Warnings:

  - Added the required column `AccountId` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_roleId_fkey";

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "accountId" TEXT;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "AccountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
