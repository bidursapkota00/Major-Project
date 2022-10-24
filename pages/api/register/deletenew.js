import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import User from '../../../modal/user';
import db from '../../../util/mongodb';

const handler = nextConnect(error);

handler.delete(async (req, res) => {
  const { user } = req.body;
  await db.connect();
  const userr = await User.findById(user);
  if (userr) {
    await userr.remove();
    res.send({ message: 'User Deleted' });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

export default handler;
