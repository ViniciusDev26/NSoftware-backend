/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Companys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelationRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_orderId_fkey";

-- DropForeignKey
ALTER TABLE "RelationRequest" DROP CONSTRAINT "RelationRequest_orderId_fkey";

-- DropForeignKey
ALTER TABLE "RelationRequest" DROP CONSTRAINT "RelationRequest_productId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_addressId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_companyId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_orderId_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Companys";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Products";

-- DropTable
DROP TABLE "RelationRequest";

-- DropTable
DROP TABLE "Sizes";

-- DropTable
DROP TABLE "Stock";

-- DropTable
DROP TABLE "role";

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "obs" TEXT,
    "orderId" INTEGER,
    "accountId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "companyCode" TEXT NOT NULL,
    "codeEmployee" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" INTEGER NOT NULL,
    "district" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "sizesId" INTEGER NOT NULL,
    "recipeId" INTEGER
);

-- CreateTable
CREATE TABLE "sizes" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Sem nome',
    "image" TEXT NOT NULL DEFAULT 'https://images.tcdn.com.br/img/img_prod/734896/telefone_ramal_sem_fio_ts_5121_preto_2577_1_546d22ba08fae4a55e7ad243dfdc8b90.jpeg',
    "companyId" INTEGER NOT NULL,
    "priority" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "obs" TEXT,
    "value" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "lat" TEXT,
    "lng" TEXT,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "relation_requests" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_id_key" ON "addresses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_companyCode_key" ON "companies"("companyCode");

-- CreateIndex
CREATE UNIQUE INDEX "companies_codeEmployee_key" ON "companies"("codeEmployee");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sizes_id_key" ON "sizes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "relation_requests_id_key" ON "relation_requests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_id_key" ON "stocks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relation_requests" ADD CONSTRAINT "relation_requests_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relation_requests" ADD CONSTRAINT "relation_requests_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
