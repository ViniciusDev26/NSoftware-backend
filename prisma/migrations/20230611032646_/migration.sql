/*
  Warnings:

  - You are about to drop the column `accountId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `AccountId` on the `roles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_AccountId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "accountId";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "AccountId";

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
