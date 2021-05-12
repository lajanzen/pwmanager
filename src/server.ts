import { printPassword } from "./utils/messages";
import {
  askForMainPassword,
  chooseCommand,
  addNewService,
  chooseService,
  addNewUserAndPw,
} from "./utils/questions";
import { doesServiceExist, isMainPasswordValid } from "./utils/validation";

/* Solution with Recursion */
// function start () {
const start = async () => {
  const mainPassword = await askForMainPassword();
  if (!isMainPasswordValid(mainPassword)) {
    console.log("Is invalid");
    start(); // Recursion (springt zurück zur start-Funktion)
  } else {
    console.log("Is valid");
  }

  /* Solution with while */
  // const start = async () => {
  // let mainPassword = await askForMainPassword();
  // while (!isMainPasswordValid(mainPassword)) {
  //   console.log('Is invalid');
  //   mainPassword = await askForMainPassword();
  // }
  // console.log('Is valid');

  const command = await chooseCommand();

  switch (command) {
    case "list":
      {
        const service = await chooseService();
        printPassword(service);
      }

      break;
    case "add":
      {
        const askForCredential = async () => {
          const newService = await addNewService();
          if (doesServiceExist(newService)) {
            console.log("Does already exist");
            askForCredential(); // Recursion (springt zurück nach oben)
          } else {
            await addNewUserAndPw();
            console.log("We've saved you new credentials");
          }
        };
        askForCredential();
      }
      break;
  }
};

start();
