import "./env.js";

import express from "express";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,
  })
);

app.use(express.json());

// ✅ CORRECT mounting (NO wildcard)
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/health", (req, res) => {
  res.send("OK");
});

// app.get("/api/me", async (req, res) => {
//   const session = await auth.getSession({
//     headers: fromNodeHeaders(req.headers),
//   });
//   res.json(session);
// });

app.get("/device", (req, res) => {
  const { user_code } = req.query;
  res.redirect(
    `${process.env.FRONTEND_URL}/device?user_code=${user_code}`
  );
});

const PORT = Number(process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
