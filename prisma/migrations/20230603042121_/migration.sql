/*
  Warnings:

  - You are about to drop the column `AddresssId` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "AddresssId",
ADD COLUMN     "AddressId" INTEGER;