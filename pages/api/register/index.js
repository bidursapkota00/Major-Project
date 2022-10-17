import nextConnect from 'next-connect';
import { db } from '../../../util/firebase';
import { ref, set } from 'firebase/database';
import { error } from '../../../util/apierr';

const handler = nextConnect(error);

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
