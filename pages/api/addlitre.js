import nextConnect from 'next-connect';
import { error } from '../../util/apierr';
import db from '../../util/mongodb';
import Device from '../../modal/device';
import { ref, set } from 'firebase/database';
import { db as dbb } from '../../util/firebase';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { litre, deviceId } = req.body;
  if (litre > 100000) {
    const reff = ref(dbb, `/devices/${deviceId}`);
    set(reff, {
      stream: 'VALVE_OFF',
    });
  }
  await db.connect();
  const device = await Device.findById(deviceId);
  if (device) {
    device.datas.push({ litre });
    device.total_litre = litre;
    await device.save();
    res.send({ message: 'Data Added Successfully', device });
  } else {
    res.status(404).send({ message: 'Device Not Found' });
  }
});

export default handler;
