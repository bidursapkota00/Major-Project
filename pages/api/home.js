import nextConnect from 'next-connect';
import { error } from '../../util/apierr';
import db from '../../util/mongodb';
import { Models } from '../../modal';

const { Device } = Models;

const handler = nextConnect(error);

handler.get(async (req, res) => {
  await db.connect();
  const devices = await Device.find()
    .select('user total_litre')
    .populate({ path: 'user', select: 'name -_id' });
  const data = devices.map((device) => {
    const unit = device.total_litre / 1000;
    return {
      key: device._id,
      id: device._id,
      name: device.user.name,
      unit,
      due: unit > 20 ? unit * 8 : 80,
    };
  });
  res.send({ message: data });
});

export default handler;
