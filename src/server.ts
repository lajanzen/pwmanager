import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {
  deleteCredential,
  readCredential,
  readCredentials,
  saveCredentials,
} from "./utils/credentials";
import { connectDatabase } from "./utils/database";

if (process.env.MONGO_URL === undefined) {
  throw new Error("Missing env MONGO_URL");
}

const app = express();
const port = 5000;

app.use(express.json());

app.get("/api/credentials", async (_request, response) => {
  const credentials = await readCredentials();
  response.json(credentials);
});

app.get("/api/credentials/:service", async (request, response) => {
  const credential = await readCredential(request.params.service);
  response.json(credential);
});

app.post("/api/credentials", async (request, response) => {
  const credentials = await request.body;
  saveCredentials(credentials);
  response.json("Credential saved in db");
});

app.delete("/api/credentials/:service", async (request, response) => {
  const credential = request.params.service;
  await deleteCredential({ service: credential });
  const credentials = await readCredentials();
  response.json(credentials);

  // response.send("Delete credentials");
});

connectDatabase(process.env.MONGO_URL).then(() => {
  // then ist Alternative zu await
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`PWmanager listening at http://localhost:${port}`);
  });
});
