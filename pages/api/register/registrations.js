import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import User from '../../../modal/user';

const handler = nextConnect(error);

handler.get(async (req, res) => {
  await db.connect();
  const users = await User.find({ new: true }).select('name number');
  const data = users.map((user) => {
    return {
      key: user._id.toString(),
      name: user.name,
      number: user.number,
    };
  });
  res.send({ message: data });
});

export default handler;
