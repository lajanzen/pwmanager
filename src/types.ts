export type Command = "list" | "add";

// export type NewUserAndPw = {
//   username: string;
//   password: string;
// };

export type Credential = {
  service: string;
  username: string;
  password: string;
};
