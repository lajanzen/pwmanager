import fs from "fs/promises";
import { Credential } from "../types";
import { askForCredential } from "./questions";
import CryptoJS from "crypto-js";

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const response = await fs.readFile("./db.json", "utf-8");
  const data: DB = JSON.parse(response);
  return data.credentials;
};

export const saveCredentials = async (): Promise<void> => {
  const credentials = await readCredentials();
  const newCredential = await askForCredential();
  const encrypted = CryptoJS.AES.encrypt(
    newCredential.password,
    "bla"
  ).toString();
  newCredential.password = encrypted;
  console.log(newCredential);
  credentials.push(newCredential);
  const newDB = { credentials: credentials };

  const newCredentialListJSON = JSON.stringify(newDB, null, 2);
  await fs.writeFile("./db.json", newCredentialListJSON);
};
