"use server";

import prisma from "@/lib/utils";

export default async function getUserDetailsByCivicAddress(
  civicAddress: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: { civicProvidedPublicKey: civicAddress },
    });
    if (!user) {
      throw new Error("Invalid civicAddress");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}
