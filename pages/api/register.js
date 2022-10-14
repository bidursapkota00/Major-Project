import nextConnect from 'next-connect';
import { db } from '../../util/firebase';
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
    set(ref(db, `/users/${Date.now()}`), {
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
