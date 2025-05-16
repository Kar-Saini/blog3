"use server";

import prisma from "@/lib/utils";
import {
  Connection,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";

const SECRET_KEY = process.env.SERVER_SECRET_KEY!;
const serverKeypair = Keypair.fromSecretKey(bs58.decode(SECRET_KEY));

const connection = new Connection("https://api.devnet.solana.com");

export default async function sendTip(
  blogId: string,
  amount: number, // in SOL
  initiatedByUserId: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: initiatedByUserId },
    });
    if (!user) throw new Error("Invalid User");

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: { blogOwner: true },
    });
    if (!blog) throw new Error("Invalid Blog Id");

    const senderPublicKey = new PublicKey(serverKeypair.publicKey);
    const recipientPublicKey = new PublicKey(
      blog.blogOwner.civicProvidedPublicKey
    );

    const lamports = amount * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      serverKeypair,
    ]);

    await prisma.tip.create({
      data: {
        blogId,
        fromAddress: senderPublicKey.toBase58(),
        amount: Math.floor(lamports),
        createdAt: new Date(),
        initiatedByUserId,
      },
    });

    return {
      success: true,
      message: "Tip sent successfully",
      txSignature: signature,
    };
  } catch (error) {
    console.error("Error sending tip:", error);
    throw new Error("Tip failed");
  }
}
