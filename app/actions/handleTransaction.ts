import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
export const checkBalance = async (publicKey: string) => {
  const balance = await connection.getBalance(new PublicKey(publicKey));
  return balance / LAMPORTS_PER_SOL;
};

export default async function handleTransaction(
  fromPubkey: string,
  toPubKey: string,
  amount: number
) {
  const fromPubKeyBalance = await checkBalance(fromPubkey);
  if (fromPubKeyBalance < amount) throw new Error("Insufficient funds");
}
