-- CreateEnum
CREATE TYPE "ERPOrderStatus" AS ENUM ('inProcess', 'Completed', 'Failed');

-- CreateTable
CREATE TABLE "ERPOrder" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "erpOrderID" TEXT NOT NULL,
    "status" "ERPOrderStatus" NOT NULL DEFAULT 'inProcess',
    "quantity" DOUBLE PRECISION,
    "purchaseDate" TIMESTAMP(3),
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ERPOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ERPLog" (
    "id" TEXT NOT NULL,
    "erpOrderId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "response" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ERPLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ERPLog" ADD CONSTRAINT "ERPLog_erpOrderId_fkey" FOREIGN KEY ("erpOrderId") REFERENCES "ERPOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
