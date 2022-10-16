import nextConnect from 'next-connect';
import { db } from '../../../util/firebase';
import { ref, update } from 'firebase/database';

const handler = nextConnect({
  onError: (err, req, res, next) => {
    res.status(err.http_code).end(err.message);
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.put(async (req, res) => {
  const { user } = req.body;
  update(ref(db, `/users/${user}`), {
    new: false,
  });
  res.status(200).send({ message: 'Successfully Updated New To False' });
});

export default handler;
