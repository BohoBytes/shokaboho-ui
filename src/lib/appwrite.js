import { Client, Account, Databases, OAuthProvider, Avatars } from "appwrite";

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export { OAuthProvider };
