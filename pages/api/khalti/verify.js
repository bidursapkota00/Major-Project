import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import Device from '../../../modal/device';
import { ref, set } from 'firebase/database';
import { db as dbb } from '../../../util/firebase';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { device } = req.body;
  const reff = ref(dbb, `/devices/${device}`);
  set(reff, {
    stream: 'PAYMENT_SUCCESS',
  });
  await db.connect();
  const devicee = await Device.findById(device);
  if (devicee) {
    devicee.total_litre = 0;
    await devicee.save();
    res.send({ message: 'Payment Successfull' });
  } else {
    res.status(404).send({ message: 'Device Not Found' });
  }
});

export default handler;
