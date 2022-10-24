import nextConnect from 'next-connect';
import { error } from '../../util/apierr';
import db from '../../util/mongodb';
import Device from '../../modal/device';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { litre, deviceId } = req.body;
  await db.connect();
  const device = await Device.findById(deviceId);
  if (device) {
    device.datas.push({ [Date.now()]: litre });
    device.total_litre = litre;
    await device.save();
    res.send({ message: 'Data Added Successfully', device });
  } else {
    res.status(404).send({ message: 'Device Not Found' });
  }
});

export default handler;
