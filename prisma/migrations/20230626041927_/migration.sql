-- DropForeignKey
ALTER TABLE "ProductsByCategory" DROP CONSTRAINT "ProductsByCategory_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsBySizes" DROP CONSTRAINT "ProductsBySizes_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductsByCategory" ADD CONSTRAINT "ProductsByCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsBySizes" ADD CONSTRAINT "ProductsBySizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
