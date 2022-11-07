import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import { Models } from '../../../modal';

const { Device } = Models;

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { device, pass } = req.body;
  await db.connect();
  const devicee = await Device.findById(device)
    .select('user')
    .populate({ path: 'user', select: 'password -_id' });
  if (devicee && devicee.user.password == pass) {
    res.send({ message: true, devicee });
  } else {
    res.status(401).send({ message: 'Invalid Username or Password' });
  }
});

export default handler;
