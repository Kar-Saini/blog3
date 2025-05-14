"use server";

import prisma from "@/lib/utils";

export async function getUserDetails(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { blogs: true, likes: true, tips: true, transactions: true },
    });

    if (!user) {
      throw new Error("Invalid UserID");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}
