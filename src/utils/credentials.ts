import fs from "fs/promises";
import { Credential } from "../types";
// import { askForCredential } from "./questions";
import CryptoJS from "crypto-js";

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
  const credentials = await readCredentials();
  const encrypted = CryptoJS.AES.encrypt(
    newCredential.password,
    "bla"
  ).toString();
  newCredential.password = encrypted;
  credentials.push(newCredential);
  const newDB = { credentials: credentials };

  const newCredentialListJSON = JSON.stringify(newDB, null, 2);
  await fs.writeFile("./db.json", newCredentialListJSON);
};
