import primsa from "@/lib/utils";

export async function getAllBlogById(blogId: string) {
  try {
    const blog = await primsa.blog.findUnique({
      where: { id: blogId },
      include: {
        blogOwner: true,
        likes: true,
        tips: true,
      },
    });
    if (!blog) throw new Error("Invalid Blog ID");
    return blog;
  } catch (error) {
    throw error;
  }
}
