import nextConnect from 'next-connect';
import { db } from '../../../util/firebase';
import { ref, remove } from 'firebase/database';

const handler = nextConnect({
  onError: (err, req, res, next) => {
    res.status(err.http_code).end(err.message);
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.delete(async (req, res) => {
  const { user } = req.body;
  remove(ref(db, `/users/${user}`));
  res
    .status(200)
    .send({ message: 'Successfully Deleted Registration Request' });
});

export default handler;
