/*
  Warnings:

  - A unique constraint covering the columns `[companyCode]` on the table `Companys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeEmployee]` on the table `Companys` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Companys_companyCode_key" ON "Companys"("companyCode");

-- CreateIndex
CREATE UNIQUE INDEX "Companys_codeEmployee_key" ON "Companys"("codeEmployee");
