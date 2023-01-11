import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import { Models } from '../../../modal';

const { Device, User } = Models;

const handler = nextConnect(error);

handler
  .get(async (req, res) => {
    const { id } = req.query;
    await db.connect();
    const device = await Device.findById(id)
      .select('user total_litre')
      .populate({ path: 'user' });
    const unit = device.total_litre / 1000;
    const data = {
      id: device._id,
      name: device.user.name,
      address: device.user.address,
      email: device.user.email,
      number: device.user.number,
      citizenship: device.user.citizenship,
      unit,
      due: unit == 0 ? 0 : unit > 20 ? unit * 8 : 80,
    };
    res.send({ message: data });
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    await db.connect();
    const device = await Device.findById(id).select('user');
    await Device.deleteOne({ _id: id });
    await User.deleteOne({ _id: device.user });
    console.log(device);
    res.send({ message: 'Device and user deleted' });
  });

export default handler;
