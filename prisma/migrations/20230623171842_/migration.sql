-- CreateTable
CREATE TABLE "OrderByCategory" (
    "orderId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "OrderByCategory_pkey" PRIMARY KEY ("orderId","categoryId")
);

-- AddForeignKey
ALTER TABLE "OrderByCategory" ADD CONSTRAINT "OrderByCategory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderByCategory" ADD CONSTRAINT "OrderByCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
