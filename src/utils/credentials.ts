import fs from "fs/promises";
import { Credential } from "../types";
import { getCollection } from "./database";

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const result = await fs.readFile("./db.json", "utf-8");
  const data: DB = JSON.parse(result);
  return data.credentials;
};

export const saveCredentials = async (
  newCredential: Credential
): Promise<void> => {
  await getCollection("credentials").insertOne(newCredential);
};
