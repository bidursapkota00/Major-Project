import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import Device from '../../../modal/device';
import { ref, set } from 'firebase/database';
import { db as dbb } from '../../../util/firebase';
import axios from 'axios';

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
    await axios.post(
      'https://smart-water-meter-system.vercel.app/api/addlitre',
      {
        litre: 0,
        deviceId: device,
      }
    );
    res.send({ message: 'Payment Successfull' });
  } else {
    res.status(404).send({ message: 'Device Not Found' });
  }
});

export default handler;
