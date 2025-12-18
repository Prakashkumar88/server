import "./env.js";
import express from "express";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

const app = express();

// 🔴 REQUIRED FOR RAILWAY / HTTPS COOKIES
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/device", (req, res) => {
  const { user_code } = req.query;
  res.redirect(`${process.env.FRONTEND_URL}/device?user_code=${user_code}`);
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
