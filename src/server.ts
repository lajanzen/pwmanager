const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's your password?`, (password: string) => {
  console.log(`Perfect, your password is now ${password}!`);
  readline.question(`What should happen with it?`, (action: string) => {
    console.log(`Ok, we will ${action}`);
    readline.close();
  });
});
