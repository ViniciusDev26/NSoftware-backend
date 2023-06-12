-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "companysId" INTEGER;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_companysId_fkey" FOREIGN KEY ("companysId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
