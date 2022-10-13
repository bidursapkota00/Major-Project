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
  set(ref(db, '/register'), {
    name1: 'name1',
  });
  res.status(500).send({ error: 'failed to fetch data' });
});

export default handler;
