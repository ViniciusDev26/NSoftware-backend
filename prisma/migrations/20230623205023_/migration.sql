/*
  Warnings:

  - You are about to drop the column `category` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `sizes` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `sizes` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `sizes` table. All the data in the column will be lost.
  - Added the required column `name` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `sizes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "category",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sizes" DROP COLUMN "orderId",
DROP COLUMN "productId",
DROP COLUMN "size",
ADD COLUMN     "name" TEXT NOT NULL;
