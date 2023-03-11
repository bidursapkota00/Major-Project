import nextConnect from 'next-connect';
import { error } from '../../util/apierr';
import db from '../../util/mongodb';
import { Models } from '../../modal';

const { User, Device } = Models;

const handler = nextConnect(error);

handler.post(async (req, res) => {
  await db.connect();
  const { address, search } = req.body;
  const users = await User.find({
    ...(address ? { address } : {}),
    ...(search
      ? search.includes('@')
        ? { email: search }
        : { _id: search }
      : {}),
  });
  const userId = users.map((u) => u._id);
  const devices = await Device.find({ user: { $in: userId } })
    .select('user total_litre')
    .populate({ path: 'user', select: 'name -_id' });
  const data = devices.map((device) => {
    const unit = device.total_litre / 1000;
    return {
      key: device._id,
      id: device._id,
      name: device.user.name,
      unit,
      due: unit == 0 ? 0 : unit > 20 ? unit * 8 : 80,
    };
  });
  res.send({ message: data });
});

export default handler;
