/*
  Warnings:

  - You are about to drop the column `role` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "role",
ADD COLUMN     "roleId" INTEGER;
