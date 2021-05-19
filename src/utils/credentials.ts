// import fs from "fs/promises";
import { Credential } from "../types";
import { getCredentialsCollection } from "./database";
import CryptoJS from "crypto-js";
import { chooseService } from "./questions";

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection()
    .find()
    .sort({ service: 1 }) // Sortiert die Ergebnisse Alphabetisch
    .toArray(); // wandelt Cursor-Ergebnisse in Array um
};

export const selectCredential = async (): Promise<Credential | undefined> => {
  const credentials = await readCredentials();
  const credentialServices = credentials.map(
    (credential) => credential.service
  );
  const service = await chooseService(credentialServices);
  const selectedService = credentials.find(
    (credential) => credential.service === service
  );
  return selectedService;
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
  await getCredentialsCollection().insertOne(newCredential);
};

export const deleteCredential = async (service: {
  service: string;
}): Promise<void> => {
  await getCredentialsCollection().deleteOne(service);
};
