import fs from "fs/promises";
import { Credential } from "../types";
import { askForCredential } from "./questions";

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const response = await fs.readFile("./db.json", "utf-8");
  const data: DB = JSON.parse(response);
  return data.credentials;
};

export const saveCredentials = async () => {
  const credentials = await readCredentials();
  const newCredential = await askForCredential();
  credentials.push(newCredential);
  const newDB = { credentials: credentials };

  const newCredentialListJSON = JSON.stringify(newDB, null, 2);
  await fs.writeFile("./db.json", newCredentialListJSON);
};
