/*
  Warnings:

  - The primary key for the `productsByCombo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `productsByCombo` table. All the data in the column will be lost.
  - Added the required column `Image` to the `combo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `combo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "productsByCombo" DROP CONSTRAINT "productsByCombo_comboId_fkey";

-- DropIndex
DROP INDEX "productsByCombo_id_key";

-- AlterTable
ALTER TABLE "combo" ADD COLUMN     "Image" TEXT NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "combo_id_seq";

-- AlterTable
ALTER TABLE "productsByCombo" DROP CONSTRAINT "productsByCombo_pkey",
DROP COLUMN "id",
ALTER COLUMN "comboId" SET DATA TYPE TEXT,
ADD CONSTRAINT "productsByCombo_pkey" PRIMARY KEY ("productId", "comboId");

-- AddForeignKey
ALTER TABLE "productsByCombo" ADD CONSTRAINT "productsByCombo_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "combo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
