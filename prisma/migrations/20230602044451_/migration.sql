/*
  Warnings:

  - You are about to drop the column `sizes` on the `Products` table. All the data in the column will be lost.
  - Added the required column `sizesId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "sizes",
ADD COLUMN     "sizesId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Sizes" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sizes_id_key" ON "Sizes"("id");
