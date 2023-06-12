/*
  Warnings:

  - You are about to drop the column `idAccount` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `AddressId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `OrderId` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Made the column `companyId` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_OrderId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "idAccount",
ADD COLUMN     "orderId" INTEGER;

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "AddressId",
DROP COLUMN "OrderId",
ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "orderId" INTEGER NOT NULL,
ALTER COLUMN "companyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
