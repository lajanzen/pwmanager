import inquirer from "inquirer";
import { Command } from "../types";

// export function askForMainPassword(): Promise<string> {
export const askForMainPassword = (): Promise<string> => {
  return inquirer
    .prompt<{ mainPassword: string }>([
      {
        type: "password",
        name: "mainPassword",
        message: "Enter main password",
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
      ],
    },
  ]);
  return answers.command;
};

export const addNewCredential = async (): Promise<string> => {
  const inputService = await inquirer.prompt<{ service: string }>([
    {
      type: "input",
      name: "service",
      message: "What's the service?",
    },
  ]);
  const inputUsername = await inquirer.prompt<{ username: string }>([
    {
      type: "input",
      name: "username",
      message: "What your username?",
    },
  ]);
  const inputPassword = await inquirer.prompt<{ password: string }>([
    {
      type: "input",
      name: "password",
      message: "What your password?",
    },
  ]);
  return inputService.service, inputUsername.username, inputPassword.password;
};

export const credentialList = async (): Promise<string> => {
  const answers = await inquirer.prompt<{ list: string }>([
    {
      type: "list",
      name: "list",
      message: "These are your saved credentials:",
      choices: [
        { name: "Google", value: "google" },
        { name: "Github", value: "github" },
        { name: "Codewars", value: "codewars" },
      ],
    },
  ]);
  return answers.list;
};
