// import fs from "fs/promises";
import { Credential } from "../types";
import { getCollection } from "./database";
import CryptoJS from "crypto-js";

export const readCredentials = async (): Promise<Credential[]> => {
  const cursor = getCollection("credentials").find();
  return await cursor.toArray();
};

export const saveCredentials = async (
  newCredential: Credential
): Promise<void> => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    newCredential.password,
    "bla"
  ).toString();
  newCredential.password = encryptedPassword;
  await getCollection("credentials").insertOne(newCredential);
};
