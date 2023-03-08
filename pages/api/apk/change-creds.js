import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import { Models } from '../../../modal';

const { User, Device } = Models;

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { device, pass } = req.body;
  await db.connect();
  const devicee = await Device.findById(device)
    .select('user')
    .populate({ path: 'user', select: '_id' });
  const ack = await User.updateOne(
    { _id: devicee.user._id },
    { password: pass }
  );
  res.send(ack);
});

export default handler;
