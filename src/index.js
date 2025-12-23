import "./env.js"; 

import express from "express";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";


const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://lapras-cli.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })
);
app.use((req, res, next) => {
  console.log("secure:", req.secure);
  console.log("proto:", req.headers["x-forwarded-proto"]);
  next();
});


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
  res.redirect(`https://lapras-cli.vercel.app/device?user_code=${user_code}`);
});

app.listen(process.env.PORT || 3005, () => {
  console.log(`Server is running on port https://localhost:${process.env.PORT || 3005}`);
});