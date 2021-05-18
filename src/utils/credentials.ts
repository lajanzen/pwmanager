import fs from "fs/promises";
import { Cursor } from "mongodb";
import { Credential } from "../types";
import { getCollection } from "./database";

export const readCredentials = async (): Promise<Map> => {
  await getCollection("credentials").find();
};

export const saveCredentials = async (
  newCredential: Credential
): Promise<void> => {
  await getCollection("credentials").insertOne(newCredential);
};
