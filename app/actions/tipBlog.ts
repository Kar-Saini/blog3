"use server";
import prisma from "@/lib/utils";

export async function tipBlog(
  fromAddress: string,
  initiatedByUserId: string,
  blogId: string,
  amount: number
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: initiatedByUserId },
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

    const tip = await prisma.tip.create({
      data: {
        amount,
        fromAddress,
        initiatedByUserId,
        blogId,
      },
    });
    return "Tip added";
  } catch (error) {
    return error;
  }
}
