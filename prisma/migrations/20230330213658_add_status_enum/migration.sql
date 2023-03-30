-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAID', 'RESERVED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'RESERVED';
