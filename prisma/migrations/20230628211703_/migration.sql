/*
  Warnings:

  - Added the required column `companyId` to the `combo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `productsByCombo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "combo" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "companyId" SET DATA TYPE TEXT,
ALTER COLUMN "sizeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "productsByCombo" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stocks" ALTER COLUMN "companyId" SET DATA TYPE TEXT;
