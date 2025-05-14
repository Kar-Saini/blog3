import primsa from "@/lib/utils";

export async function getAllBlogs() {
  try {
    const blogs = await primsa.blog.findMany();
    return blogs;
  } catch (error) {
    throw error;
  }
}
