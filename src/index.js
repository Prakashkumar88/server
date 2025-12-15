import "./env.js"; 

import express from "express";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
console.log("FRONTEND_URL:", FRONTEND_URL);
const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/api/me', async(req, res) => {
  const session = await auth.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.get("/device", async (req, res) => {
  const { user_code } = req.query; // Fixed: should be req.query, not req.params
  res.redirect(`${FRONTEND_URL}/device?user_code=${user_code}`);
});

app.listen(process.env.PORT || 3005, () => {
  console.log(`Server running on port ${process.env.PORT || 3005}`);
});