"use server";
import prisma from "@/lib/utils";

export default async function addNewBlog(
  title: string,
  excerpt: string,
  content: string,
  categores: string,
  isPremium: boolean,
  userId: string,
  imageUrl?: string,
  price?: number
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
        imageUrl,
        price,
      },
    });
    return blog.id;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}
