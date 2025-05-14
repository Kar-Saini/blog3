/*
  Warnings:

  - A unique constraint covering the columns `[civicProvidedPublicKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_civicProvidedPublicKey_key" ON "User"("civicProvidedPublicKey");
