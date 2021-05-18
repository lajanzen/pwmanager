import dotenv from "dotenv"; // muss unten (unter den imports) noch aufgerufen werden
import {
  askForMainPassword,
  chooseCommand,
  chooseService,
  askForCredential,
} from "./utils/questions";
import { doesServiceExist, isMainPasswordValid } from "./utils/validation";
import { readCredentials, saveCredentials } from "./utils/credentials";
import CryptoJS from "crypto-js";
import { connectDatabase } from "./utils/database";

dotenv.config();

/* Solution with Recursion */

// function start () {
const start = async () => {
  // Prüfen, ob es einen MONGO DB Link gibt
  if (process.env.MONGO_URL === undefined) {
    throw new Error("Missing env MONGO_URL");
  }

  // Mit MONGO DB verbinden
  await connectDatabase(process.env.MONGO_URL);

  const mainPassword = await askForMainPassword();
  if (!(await isMainPasswordValid(mainPassword))) {
    console.log("Is invalid");
    start(); // Recursion (springt zurück zur start-Funktion)
    return;
  }
  console.log("Is valid");

  /* Solution with while */
  // const start = async () => {
  //   let mainPassword = await askForMainPassword();
  //   while (!(await isMainPasswordValid(mainPassword))) {
  //     console.log("Is invalid");
  //     mainPassword = await askForMainPassword();
  //   }
  //   console.log("Is valid");

  const askforCommand = async () => {
    const command = await chooseCommand();

    switch (command) {
      case "list":
        {
          const credentials = await readCredentials();
          const credentialServices = credentials.map(
            (credential) => credential.service
          );
          const service = await chooseService(credentialServices);
          const selectedService = credentials.find(
            (credential) => credential.service === service
          );
          if (selectedService) {
            const decrypted = CryptoJS.AES.decrypt(
              selectedService.password,
              "bla"
            );
            const password = decrypted.toString(CryptoJS.enc.Utf8);
            console.log(
              `Your password for ${selectedService.service} is ${password}.`
            );
          }
          askforCommand();
        }

        break;
      case "add":
        {
          let newCredential = await askForCredential();
          while (await doesServiceExist(newCredential)) {
            console.log(
              `The service "${newCredential.service}" already exists!`
            );
            newCredential = await askForCredential();
          }
          await saveCredentials(newCredential);
          console.log("We've saved your new credentials!");
        }
        break;
    }
  };
  askforCommand();
};

start();
