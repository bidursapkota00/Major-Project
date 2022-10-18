import nextConnect from 'next-connect';
import { db } from '../../util/firebase';
import { ref, set } from 'firebase/database';
import { error } from '../../util/apierr';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { litre, deviceId } = req.body;
  set(ref(db, `/devices/${deviceId}/data/${Date.now()}`), {
    litre,
  });
  res.status(200).send({ message: 'Data Added' });
});

export default handler;
