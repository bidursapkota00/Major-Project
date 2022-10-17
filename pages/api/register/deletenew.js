import nextConnect from 'next-connect';
import { db } from '../../../util/firebase';
import { ref, remove } from 'firebase/database';
import { error } from '../../../util/apierr';

const handler = nextConnect(error);

handler.delete(async (req, res) => {
  const { user } = req.body;
  remove(ref(db, `/users/${user}`));
  res
    .status(200)
    .send({ message: 'Successfully Deleted Registration Request' });
});

export default handler;
