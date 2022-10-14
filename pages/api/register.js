import nextConnect from 'next-connect';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

import { ref, set } from 'firebase/database';

const handler = nextConnect({
  onError: (err, req, res, next) => {
    res.status(err.http_code).end(err.message);
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.post(async (req, res) => {
  const { name, email, password, number, citizenship } = req.body;
  try {
    set(ref(db, `/users/1`), {
      name,
      email,
      password,
      number,
      citizenship,
      new: true,
    });
    res.status(200).send({ message: `Successfully Registered ${name}` });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Failed Registered ${name} ${error.message}` });
  }
});

export default handler;
