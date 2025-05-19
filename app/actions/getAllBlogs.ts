"use server";
import primsa from "@/lib/prisma";

export default async function getAllBlogs() {
  try {
    const blogs = await primsa.blog.findMany({
      include: {
        _count: { select: { likes: true } },
        blogOwner: true,
        tips: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return blogs;
  } catch (error) {
    throw error;
  }
}
