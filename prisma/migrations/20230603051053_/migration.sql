/*
  Warnings:

  - You are about to drop the column `Lng` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "Lng",
ADD COLUMN     "lng" TEXT;
