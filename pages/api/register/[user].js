import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import User from '../../../modal/user';

const handler = nextConnect(error);

handler.get(async (req, res) => {
  const { user } = req.query;
  await db.connect();
  const user_detail = await User.findById(user);
  res.send({ message: user_detail });
});

export default handler;
