"use server";

import prisma from "@/lib/prisma";

export default async function addUserToDb(
  name: string,
  civicProvidedPublicKey: string
) {
  try {
    const userExists = await prisma.user.findUnique({
      where: { civicProvidedPublicKey },
    });
    if (userExists) return userExists.id;
    const user = await prisma.user.create({
      data: {
        civicProvidedPublicKey,
        name,
      },
    });
    return user.id;
  } catch (error) {
    console.error("Error liking blog:", error);
    throw error;
  }
}
