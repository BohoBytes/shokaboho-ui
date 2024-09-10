import {
  Client,
  Account,
  Databases,
  OAuthProvider,
  Avatars,
  Locale,
} from "appwrite";

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

export const account = new Account(client);
export const databases = new Databases(client);

const avatars = new Avatars(client);
export const getAvatarInitials = (name) => avatars.getInitials(name);

const locale = new Locale(client);
export const getAllContinents = async () =>
  (await locale.listContinents()).continents;
export const getAllLanguages = async () =>
  (await locale.listLanguages()).languages;
export const getAllCurrencies = async () =>
  (await locale.listCurrencies()).currencies;

export { OAuthProvider };
