/*
  Warnings:

  - Added the required column `district` to the `Companys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNumber` to the `Companys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Companys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Companys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Companys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companys" ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "houseNumber" INTEGER NOT NULL,
ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lng" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
