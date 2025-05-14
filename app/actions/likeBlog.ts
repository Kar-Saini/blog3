"use server";

import prisma from "@/lib/utils";

export async function likeBlog(blogId: string, userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Invalid UserID");
    }

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: { purchasedUsers: true },
    });

    if (!blog) {
      throw new Error("Invalid BlogID");
    }

    if (blog.isPremium) {
      const hasUserPurchased = blog.purchasedUsers.some((u) => u.id === userId);

      if (!hasUserPurchased) {
        throw new Error("User needs to purchase this blog to like it.");
      }
    }

    await prisma.like.create({
      data: { blogId, userId },
    });

    return "Blog liked successfully.";
  } catch (error) {
    console.error("Error liking blog:", error);
    throw error;
  }
}
