import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { deviceAuthorization } from "better-auth/plugins";
import prisma from "./db.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  basePath: "/api/auth",
  cookies: {
    state: {
      sameSite: "none",
      secure: true,
    },
    sessionToken: {
      sameSite: "none",
      secure: true,
    },
  },
  trustedOrigins: [
    "https://lapras-cli.vercel.app",
    "https://server-production-a027.up.railway.app",
  ],

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
