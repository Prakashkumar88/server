export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  basePath: "/api/auth",

  trustedOrigins: [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
  ].filter(Boolean),

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
