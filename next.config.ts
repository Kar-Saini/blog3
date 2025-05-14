import type { NextConfig } from "next";
import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";

const nextConfig: NextConfig = {};
export const withCivicAuth = createCivicAuthPlugin({
  clientId: "ceeef36b-9c12-4d08-85da-f35f45af41ac",
});

export default nextConfig;
