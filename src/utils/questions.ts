import inquirer from "inquirer";
import type { Command, Credential } from "../types";

// export function askForMainPassword(): Promise<string> {
export const askForMainPassword = (): Promise<string> => {
  return inquirer
    .prompt<{ mainPassword: string }>([
      {
        type: "password",
        name: "mainPassword",
        message: "Enter main password",
        mark: "*",
      },
    ])
    .then((answers) => answers.mainPassword);
};

export const chooseCommand = async (): Promise<Command> => {
  const answers = await inquirer.prompt<{ command: Command }>([
    {
      type: "list",
      name: "command",
      message: "What would you like to do?",
      choices: [
        { name: "List credentials", value: "list" },
        { name: "Add new credentials", value: "add" },
        { name: "Delete credential", value: "delete" },
      ],
    },
  ]);
  return answers.command;
};

export const addNewService = async (): Promise<string> => {
  const inputService = await inquirer.prompt<{ service: string }>([
    {
      type: "input",
      name: "service",
      message: "What's the service?",
    },
  ]);
  return inputService.service;
};

// export const addNewUserAndPw = async (): Promise<NewUserAndPw> => {
//   const answers = await inquirer.prompt<NewUserAndPw>([
//     {
//       type: "input",
//       name: "username",
//       message: "What your username?",
//     },
//     {
//       type: "password",
//       name: "password",
//       message: "What's your password?",
//       mask: "*",
//     },
//   ]);
//   return answers;
// };

export const chooseService = async (services: string[]): Promise<string> => {
  const answers = await inquirer.prompt<{ service: string }>([
    {
      type: "list",
      name: "service",
      message: "Choose service:",
      choices: services,
    },
  ]);
  return answers.service;
};

export const askForCredential = async (): Promise<Credential> => {
  const answers = await inquirer.prompt<Credential>([
    {
      type: "input",
      name: "service",
      message: "Please enter service name",
    },
    {
      type: "input",
      name: "username",
      message: "Please enter username",
    },
    { type: "password", name: "password", message: "Please enter password" },
  ]);
  return answers;
};
