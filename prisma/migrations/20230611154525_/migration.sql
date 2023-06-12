-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_companyId_fkey";

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
