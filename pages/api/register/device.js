import nextConnect from 'next-connect';
import { db } from '../../../util/firebase';
import { ref, set } from 'firebase/database';
import { error } from '../../../util/apierr';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { device, user } = req.body;
  set(ref(db, `/devices/${device}`), {
    user,
    stream: 'OFF',
  });
  res.status(200).send({ message: 'Successfully Registered' });
});

export default handler;
