/*
  Warnings:

  - Added the required column `district` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "district" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "Lng" TEXT,
ADD COLUMN     "lat" TEXT;
