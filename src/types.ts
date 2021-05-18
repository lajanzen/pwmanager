export type Command = "list" | "add" | "delete";

// export type NewUserAndPw = {
//   username: string;
//   password: string;
// };

export type Credential = {
  service: string;
  username: string;
  password: string;
};
