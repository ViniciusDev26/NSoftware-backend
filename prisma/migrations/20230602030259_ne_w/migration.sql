/*
  Warnings:

  - Added the required column `AddresssId` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "AddresssId" INTEGER NOT NULL,
ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "obs" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "wage" INTEGER;

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL,
    "idAccount" INTEGER NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" INTEGER NOT NULL,
    "obs" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Companys" (
    "id" INTEGER NOT NULL,
    "companyCode" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "access" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "pathImage" TEXT NOT NULL,
    "obs" TEXT,
    "value" INTEGER NOT NULL,
    "size" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Companys_id_key" ON "Companys"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_id_key" ON "Stock"("id");
