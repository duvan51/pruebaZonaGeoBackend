// config/firebaseConfig.js
import admin from 'firebase-admin';
import serviceAccount from './configFirestore/serviceAccountKeys.json' assert { type: 'json' };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db };
