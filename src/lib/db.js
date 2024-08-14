import { ID } from "appwrite";
import { databases } from "./appwrite";

const db = {};
const collections = [
  {
    name: "countries",
    dbId: import.meta.env.VITE_APPWRITE_DB_SHOKABOHO,
    colId: import.meta.env.VITE_APPWRITE_COLL_COUNTRIES,
  },
  {
    name: "conflicts",
    dbId: import.meta.env.VITE_APPWRITE_DB_SHOKABOHO,
    colId: import.meta.env.VITE_APPWRITE_COLL_CONFLICTS,
  },
  {
    name: "persons",
    dbId: import.meta.env.VITE_APPWRITE_DB_SHOKABOHO,
    colId: import.meta.env.VITE_APPWRITE_COLL_PERSONS,
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.colId, id, payload, permissions),
    update: (id, payload, permissions) =>
      databases.updateDocument(col.dbId, col.colId, id, payload, permissions),
    list: (queries = []) =>
      databases.listDocuments(col.dbId, col.colId, queries),
    get: (id) => databases.getDocument(col.dbId, col.colId, id),
    delete: (id) => databases.deleteDocument(col.dbId, col.colId, id),
  };
});

export default db;
