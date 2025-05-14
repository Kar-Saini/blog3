"use client";

import { userHasWallet } from "@civic/auth-web3";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wind } from "lucide-react";
import { useUser } from "@civic/auth-web3/react";
import { useEffect, useState } from "react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { addUserToDb } from "@/app/actions/addUserToDb";

const checkBalance = async (publicKey: string) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const balance = await connection.getBalance(new PublicKey(publicKey));
  console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
  return balance / LAMPORTS_PER_SOL;
};

const Appbar = () => {
  const userContext = useUser();
  const [walletAddress, setWalletAddress] = useState<null | string>(null);
  const [balance, setBalance] = useState<null | number>(null);
  const setupWallet = async () => {
    if (userContext.user && !userHasWallet(userContext)) {
      await userContext.createWallet();
    }
    const currentAddress = userContext?.solana?.address;
    if (currentAddress) {
      setWalletAddress(currentAddress);

      const bal = await checkBalance(currentAddress);
      if (bal) setBalance(bal);

      await addUserToDb(userContext.user?.name!, currentAddress);
    }
  };
  useEffect(() => {
    setupWallet();
  }, [userContext.user]);

  const isLoggedIn = userContext.authStatus === "authenticated";

  async function handleLoginClick() {
    if (isLoggedIn) await userContext.signOut();
    else await userContext.signIn();
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md px-6 py-4 rounded-md mx-auto max-w-screen-xl flex items-center justify-between font-mono">
      <Link
        href="/"
        className="text-3xl font-extrabold tracking-tight text-blog-dark font-mono"
      >
        <span className="flex items-center gap-2">
          <Wind className="text-pink-600" />
          <span>blog3</span>
        </span>
      </Link>
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <div className="flex flex-col text-right text-sm text-gray-600 font-mono">
            <div className="text-base font-bold text-gray-800">
              {userContext.user?.name}
            </div>
            {walletAddress ? (
              <>
                <div className=" flex items-center justify-end gap-2 text-xs text-gray-500 bg-gray-100 px-2  py-1 rounded-full">
                  <span className="font-semibold text-gray-700">Wallet:</span>
                  <span className="font-mono">
                    {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                  </span>

                  <div className="text-sm font-semibold text-green-700 bg-green-100 px-1 rounded-sm">
                    {balance?.toFixed(4)} SOL
                  </div>
                </div>
              </>
            ) : (
              <span className="italic text-gray-400 flex items-center gap-2">
                Connecting wallet...
              </span>
            )}
          </div>
        )}

        <Button
          onClick={handleLoginClick}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow hover:opacity-90 transition text-sm px-4 py-2 rounded"
          aria-label={isLoggedIn ? "Sign Out" : "Sign In"}
        >
          {isLoggedIn ? "🔓 Sign Out" : "🔐 Sign In"}
        </Button>
      </div>
    </nav>
  );
};

export default Appbar;
