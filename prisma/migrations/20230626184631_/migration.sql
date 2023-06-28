/*
  Warnings:

  - The primary key for the `ProductsByCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductsBySizes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `productsByCombo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ProductsByCategory" DROP CONSTRAINT "ProductsByCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsByCategory" DROP CONSTRAINT "ProductsByCategory_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsBySizes" DROP CONSTRAINT "ProductsBySizes_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsBySizes" DROP CONSTRAINT "ProductsBySizes_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_addressId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_companyId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_roleId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_companyId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_productId_fkey";

-- DropForeignKey
ALTER TABLE "productsByCombo" DROP CONSTRAINT "productsByCombo_productId_fkey";

-- DropForeignKey
ALTER TABLE "relation_requests" DROP CONSTRAINT "relation_requests_orderId_fkey";

-- DropForeignKey
ALTER TABLE "relation_requests" DROP CONSTRAINT "relation_requests_productId_fkey";

-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_companyId_fkey";

-- DropForeignKey
ALTER TABLE "sizes" DROP CONSTRAINT "sizes_companyId_fkey";

-- AlterTable
ALTER TABLE "ProductsByCategory" DROP CONSTRAINT "ProductsByCategory_pkey",
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductsByCategory_pkey" PRIMARY KEY ("productId", "categoryId");

-- AlterTable
ALTER TABLE "ProductsBySizes" DROP CONSTRAINT "ProductsBySizes_pkey",
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "sizeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductsBySizes_pkey" PRIMARY KEY ("productId", "sizeId");

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "companyId" SET DATA TYPE TEXT,
ALTER COLUMN "roleId" SET DATA TYPE TEXT,
ALTER COLUMN "addressId" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "addresses_id_seq";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT;
DROP SEQUENCE "categories_id_seq";

-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "companies_id_seq";

-- AlterTable
ALTER TABLE "favorites" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT;
DROP SEQUENCE "favorites_id_seq";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT;
DROP SEQUENCE "orders_id_seq";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "products_id_seq";

-- AlterTable
ALTER TABLE "productsByCombo" DROP CONSTRAINT "productsByCombo_pkey",
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "productsByCombo_pkey" PRIMARY KEY ("productId", "comboId");

-- AlterTable
ALTER TABLE "relation_requests" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT;
DROP SEQUENCE "relation_requests_id_seq";

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT;
DROP SEQUENCE "roles_id_seq";

-- AlterTable
ALTER TABLE "sizes" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT;
DROP SEQUENCE "sizes_id_seq";

-- AlterTable
ALTER TABLE "stocks" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "stocks_id_seq";

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsByCombo" ADD CONSTRAINT "productsByCombo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsByCategory" ADD CONSTRAINT "ProductsByCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsByCategory" ADD CONSTRAINT "ProductsByCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsBySizes" ADD CONSTRAINT "ProductsBySizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsBySizes" ADD CONSTRAINT "ProductsBySizes_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relation_requests" ADD CONSTRAINT "relation_requests_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relation_requests" ADD CONSTRAINT "relation_requests_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
