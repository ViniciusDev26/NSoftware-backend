/*
  Warnings:

  - You are about to drop the column `orderId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "orderId",
DROP COLUMN "recipeId",
DROP COLUMN "sizeId";
