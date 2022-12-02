import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import { ref, set } from 'firebase/database';
import { db } from '../../../util/firebase';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { deviceId } = req.body;
  const reff = ref(db, `/devices/${deviceId}`);
  set(reff, {
    stream: 'NOTHING',
  });
  res.send({ message: 'Stream Updated to NOTHING' });
});

export default handler;
