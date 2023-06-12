/*
  Warnings:

  - You are about to drop the column `image` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_orderId_fkey";

-- DropForeignKey
ALTER TABLE "sizes" DROP CONSTRAINT "sizes_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "image",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "name",
DROP COLUMN "value",
ADD COLUMN     "sizesId" INTEGER;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_sizesId_fkey" FOREIGN KEY ("sizesId") REFERENCES "sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
