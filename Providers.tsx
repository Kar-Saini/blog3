"use client";

import { CivicAuthProvider } from "@civic/auth-web3";

export const CivicProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CivicAuthProvider clientId="ceeef36b-9c12-4d08-85da-f35f45af41ac">
      {children}
    </CivicAuthProvider>
  );
};
