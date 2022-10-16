import nextConnect from 'next-connect';
import { db } from '../../../util/firebase';
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
  const { name, address, email, password, number, citizenship } = req.body;
  set(ref(db, `/users/${Date.now()}`), {
    name,
    address,
    email,
    password,
    number,
    citizenship,
    new: true,
  });
  res.status(200).send({ message: 'Successfully Registered' });
});

export default handler;
