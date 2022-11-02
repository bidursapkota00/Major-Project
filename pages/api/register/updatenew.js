import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import User from '../../../modal/user';

const handler = nextConnect(error);

handler.put(async (req, res) => {
  const { user } = req.body;
  await db.connect();
  console.log(user);
  const userr = await User.findById(user);
  if (userr) {
    userr.new = false;
    await userr.save();
    res.send({ message: 'User Updated Successfully' });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

export default handler;
