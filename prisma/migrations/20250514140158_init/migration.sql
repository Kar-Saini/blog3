-- CreateTable
CREATE TABLE "_PurchasedBlogs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PurchasedBlogs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PurchasedBlogs_B_index" ON "_PurchasedBlogs"("B");

-- AddForeignKey
ALTER TABLE "_PurchasedBlogs" ADD CONSTRAINT "_PurchasedBlogs_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchasedBlogs" ADD CONSTRAINT "_PurchasedBlogs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
