import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const connection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

export const checkBalance = async (publicKey: string) => {
  const balance = await connection.getBalance(new PublicKey(publicKey));
  return balance / LAMPORTS_PER_SOL;
};

export async function handleTrxn(
  fromPubkey: string,
  toPubKey: string,
  amount: number,
  signTransaction: (tx: Transaction, conn: Connection) => Promise<string>
) {
  const fromPubKeyBalance = await checkBalance(fromPubkey);
  if (fromPubKeyBalance < amount) throw new Error("Insufficient funds");

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(fromPubkey),
      toPubkey: new PublicKey(toPubKey),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );
  const { blockhash } = await connection.getLatestBlockhash("finalized");
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = new PublicKey(fromPubkey);

  const signature = await signTransaction(transaction, connection);
  return signature;
}
