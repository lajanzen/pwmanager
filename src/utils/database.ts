import { Collection, MongoClient } from "mongodb";

let client: MongoClient; // definieren wir hier, damit wir auch in anderen Funktionen darauf zugreifen können
export const connectDatabase = async (url: string): Promise<void> => {
  client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
};

export const disconnectDatabase = (): Promise<void> => {
  return client.close();
};

// Greift auf Credential-List in MongoDB zu
export const getCollection = (name: string): Collection => {
  return client.db().collection(name);
};
