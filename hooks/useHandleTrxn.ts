"use client";

import { useUser } from "@civic/auth-web3/react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
export const checkBalance = async (publicKey: string) => {
  const balance = await connection.getBalance(new PublicKey(publicKey));
  return balance / LAMPORTS_PER_SOL;
};

export default async function useHandleTrxn(
  fromPubkey: string,
  toPubKey: string,
  amount: number
) {
  const fromPubKeyBalance = await checkBalance(fromPubkey);
  if (fromPubKeyBalance < amount) throw new Error("Insufficient funds");
  const { sendTransaction } = userContext.solana.wallet;

  const userContext = useUser();
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(fromPubkey),
      toPubkey: new PublicKey(toPubKey),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );
  const signature = await sendTransaction(transaction, connection);
}
