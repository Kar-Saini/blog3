/*
  Warnings:

  - Made the column `createdAt` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "price" INTEGER,
ALTER COLUMN "createdAt" SET NOT NULL;
