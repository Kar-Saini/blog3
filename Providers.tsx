"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { CivicAuthProvider } from "@civic/auth-web3/react";

export const CivicProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <CivicAuthProvider clientId="ceeef36b-9c12-4d08-85da-f35f45af41ac">
          {children}
        </CivicAuthProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
