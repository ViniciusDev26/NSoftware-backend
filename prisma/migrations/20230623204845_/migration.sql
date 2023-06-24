-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "sizes" DROP CONSTRAINT "sizes_productId_fkey";

-- CreateTable
CREATE TABLE "ProductsBySizes" (
    "productId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "ProductsBySizes_pkey" PRIMARY KEY ("productId","sizeId")
);

-- AddForeignKey
ALTER TABLE "ProductsBySizes" ADD CONSTRAINT "ProductsBySizes_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsBySizes" ADD CONSTRAINT "ProductsBySizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
