// import fs from "fs/promises";
import { Credential } from "../types";
import { getCollection } from "./database";
import CryptoJS from "crypto-js";

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCollection("credentials").find().toArray();
};

export const saveCredentials = async (
  newCredential: Credential
): Promise<void> => {
  // Passwort encrypten
  const encryptedPassword = CryptoJS.AES.encrypt(
    newCredential.password,
    "bla"
  ).toString();
  newCredential.password = encryptedPassword;

  // In MongoDB speichern
  await getCollection("credentials").insertOne(newCredential);
};
