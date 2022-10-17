import nextConnect from 'next-connect';
import { db } from '../../../util/firebase';
import { ref, update } from 'firebase/database';
import { error } from '../../../util/apierr';

const handler = nextConnect(error);

handler.put(async (req, res) => {
  const { user } = req.body;
  update(ref(db, `/users/${user}`), {
    new: false,
  });
  res.status(200).send({ message: 'Successfully Updated New To False' });
});

export default handler;
