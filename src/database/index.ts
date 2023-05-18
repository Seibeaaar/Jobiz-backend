import * as admin from "firebase-admin";
import {v4} from "uuid";

const firestore = admin.firestore();

const Database = {
  get: async (collection: string, id: string) => {
    const snapshot = await firestore.collection(collection).doc(id).get();
    if (!snapshot.exists) return null;
    return snapshot.data();
  },
  create: async (collection: string, data: object, id?: string) => {
    const collectionRef = firestore.collection(collection);
    const docId = id ?? v4();
    const ref = collectionRef.doc(docId);
    await ref.set(data);
    const newDoc = await Database.get(collection, docId);
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
