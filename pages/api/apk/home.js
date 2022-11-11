import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import { Models } from '../../../modal';

const { Device } = Models;

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { device } = req.body;
  console.log(req.body, device);
  await db.connect();
  const devicee = await Device.findById(device)
    .select('user stream total_litre datas')
    .populate({ path: 'user', select: 'name' });
  res.send({ message: devicee });
});

export default handler;
