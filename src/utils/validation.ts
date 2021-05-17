import fs from "fs/promises";
import sha256 from "crypto-js/sha256";
import { readCredentials } from "./credentials";
import type { Credential } from "../types";

export const isMainPasswordValid = async (
  plaintextPassword: string
): Promise<boolean> => {
  const passwordHash = await fs.readFile("./.password", "utf-8");
  const plaintextPasswordHash = sha256(plaintextPassword).toString();
  return plaintextPasswordHash === passwordHash;
};

export const doesServiceExist = async (
  newCredential: Credential
): Promise<boolean> => {
  const credentials = await readCredentials();
  const credentialAlreadyUsed = credentials.some(
    (credential) =>
      credential.service.toLowerCase() === newCredential.service.toLowerCase()
  );
  return credentialAlreadyUsed;
};
