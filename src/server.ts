import { askForMainPassword } from "./utils/questions";
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
};

/* Solution with while */
// const start = async () => {
// let mainPassword = await askForMainPassword();
// while (!isMainPasswordValid(mainPassword)) {
//   console.log('Is invalid');
//   mainPassword = await askForMainPassword();
// }
// console.log('Is valid');

start();
