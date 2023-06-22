/*
  Warnings:

  - You are about to drop the column `orderId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_productId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_favoritesId_fkey";

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "favoriteId" INTEGER;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "orderId",
DROP COLUMN "productId",
ADD COLUMN     "productsId" INTEGER;

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "orderId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "categoryId",
DROP COLUMN "favoritesId";

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
