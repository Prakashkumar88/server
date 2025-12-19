import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app = express();

app.use(
  cors({
    origin: "https://client-aj2q.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// ✅ THIS MUST EXIST
app.all("/api/auth/*", toNodeHandler(auth));

app.get("/health", (_req, res) => {
  res.send("OK");
});

app.listen(process.env.PORT || 3005, () => {
  console.log("Server running");
});
