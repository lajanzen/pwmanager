import {
  askForMainPassword,
  chooseCommand,
  addNewCredential,
} from "./utils/questions";
import { isMainPasswordValid } from "./utils/validation";

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
      console.log("List Case");
      break;
    case "add":
      addNewCredential();
      break;
  }
};

start();
