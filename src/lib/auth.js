import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { deviceAuthorization } from "better-auth/plugins";
import prisma from "./db.js";

// console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  basePath: "/api/auth",
  trustedOrigins: [(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []), "http://localhost:3000"],
  plugins: [
    deviceAuthorization({
      verificationUri: "/device",
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});
