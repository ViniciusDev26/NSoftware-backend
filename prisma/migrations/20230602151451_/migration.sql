/*
  Warnings:

  - You are about to drop the column `pathImage` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `priority` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "pathImage",
DROP COLUMN "productId",
ADD COLUMN     "priority" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "RelationRequest" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RelationRequest_id_key" ON "RelationRequest"("id");

-- AddForeignKey
ALTER TABLE "RelationRequest" ADD CONSTRAINT "RelationRequest_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationRequest" ADD CONSTRAINT "RelationRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
