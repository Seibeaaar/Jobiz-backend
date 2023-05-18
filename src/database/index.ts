import {firestore} from "..";

const Database = {
  get: async (collection: string, id: string) => {
    const snapshot = await firestore.collection(collection).doc(id).get();
    if (!snapshot.exists) return null;
    return snapshot.data();
  },
  create: async (collection: string, data: object) => {
    const newDoc = await firestore.collection(collection).add(data);
    return newDoc;
  },
  delete: async (collection: string, id: string) => {
    const snapshot = firestore.collection(collection).doc(id);
    const doc = await snapshot.get();
    if (!doc.exists) return null;
    await snapshot.delete();
    return id;
  },
  update: async (collection: string, data: object, id: string) => {
    const snapshot = firestore.collection(collection).doc(id);
    const doc = await snapshot.get();
    if (!doc.exists) return null;
    await snapshot.set(data, {
      merge: true,
    });
    const newDoc = await Database.get(collection, id);
    return newDoc;
  },
};

export default Database;
