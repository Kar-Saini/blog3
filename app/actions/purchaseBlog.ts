"use server";

import prisma from "@/lib/utils";

export default async function purchaseBlog(blogId: string, userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    console.log(user);
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

    if (!blog.isPremium) {
      throw new Error("Blog is not premium");
    }

    await prisma.blog.update({
      where: { id: blogId },
      data: { purchasedUsers: { connect: { id: userId } } },
    });

    return "Purchased succesfully.";
  } catch (error) {
    console.error("Error liking blog:", error);
    throw error;
  }
}
