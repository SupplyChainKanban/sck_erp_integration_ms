/*
  Warnings:

  - Added the required column `materialID` to the `ERPOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ERPOrder" ADD COLUMN     "materialID" TEXT NOT NULL;
