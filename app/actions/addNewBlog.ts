"use server";
import prisma from "@/lib/utils";

export async function addNewBlog(
  title: string,
  excerpt: string,
  content: string,
  categores: string,
  isPremium: boolean,
  userId: string
) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("Invalid User");
    const blog = await prisma.blog.create({
      data: {
        content,
        excerpt,
        tags: categores,
        title,
        isPremium,
        blogOwnerId: user.id,
      },
    });
    return blog.id;
  } catch (error) {
    console.error("Error liking blog:", error);
    throw error;
  }
}
