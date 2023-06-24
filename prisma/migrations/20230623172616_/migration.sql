/*
  Warnings:

  - You are about to drop the column `productsId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the `OrderByCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderByCategory" DROP CONSTRAINT "OrderByCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "OrderByCategory" DROP CONSTRAINT "OrderByCategory_orderId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_productsId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "productsId";

-- DropTable
DROP TABLE "OrderByCategory";

-- CreateTable
CREATE TABLE "ProductsByCategory" (
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "ProductsByCategory_pkey" PRIMARY KEY ("productId","categoryId")
);

-- AddForeignKey
ALTER TABLE "ProductsByCategory" ADD CONSTRAINT "ProductsByCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsByCategory" ADD CONSTRAINT "ProductsByCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
