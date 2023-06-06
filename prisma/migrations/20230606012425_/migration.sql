-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "role_id_key" ON "role"("id");
