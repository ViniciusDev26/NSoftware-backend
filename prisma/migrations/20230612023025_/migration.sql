/*
  Warnings:

  - You are about to drop the column `productsId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `sizesId` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_productsId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_sizesId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "productsId",
DROP COLUMN "sizesId",
ADD COLUMN     "productId" INTEGER,
ADD COLUMN     "sizeId" INTEGER;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
