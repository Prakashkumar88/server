import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { deviceAuthorization } from "better-auth/plugins";
import prisma from "./db.js";

export const auth = betterAuth({
  // debug: true,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  basePath: "/api/auth",

  trustedOrigins: [
    process.env.FRONTEND_URL,
    process.env.BETTER_AUTH_URL,
  ].filter(Boolean),

  // 🔴 THIS IS THE MISSING PART
  cookies: {
    session: {
      sameSite: "none",
      secure: true,
    },
    csrf: {
      sameSite: "none",
      secure: true,
    },
  },

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

  secret: process.env.BETTER_AUTH_SECRET,
});
