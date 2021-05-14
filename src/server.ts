// import { printPassword } from "./utils/messages";
import {
  askForMainPassword,
  chooseCommand,
  addNewService,
  chooseService,
} from "./utils/questions";
import { doesServiceExist, isMainPasswordValid } from "./utils/validation";
import { readCredentials, saveCredentials } from "./utils/credentials";

/* Solution with Recursion */
// function start () {
const start = async () => {
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
          console.log(selectedService);
          askforCommand();
          // printPassword(service);
        }

        break;
      case "add":
        {
          const newService = await addNewService();
          if (doesServiceExist(newService)) {
            console.log("Does already exist");
          } else {
            await saveCredentials();
            console.log("We've saved your new credentials!");
          }
        }
        break;
    }
  };
  askforCommand();
};

start();
