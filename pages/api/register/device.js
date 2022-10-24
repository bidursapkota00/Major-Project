import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import Device from '../../../modal/device';
import db from '../../../util/mongodb';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { device, user } = req.body;
  await db.connect();
  const newDevice = new Device({
    _id: device,
    user,
  });
  const devicee = await newDevice.save();
  res.send({ message: 'Device Created', devicee });
});

export default handler;
