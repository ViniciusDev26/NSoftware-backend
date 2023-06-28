-- CreateTable
CREATE TABLE "productsByCombo" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "comboId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "combo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "productsByCombo_id_key" ON "productsByCombo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "combo_id_key" ON "combo"("id");

-- AddForeignKey
ALTER TABLE "productsByCombo" ADD CONSTRAINT "productsByCombo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsByCombo" ADD CONSTRAINT "productsByCombo_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "combo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
