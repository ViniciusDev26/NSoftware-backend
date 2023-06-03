/*
  Warnings:

  - Added the required column `codeEmployee` to the `Companys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companys" ADD COLUMN     "codeEmployee" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "AddressId" DROP NOT NULL;
