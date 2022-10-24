import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import User from '../../../modal/user';
import db from '../../../util/mongodb';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { name, address, email, password, number, citizenship } = req.body;
  await db.connect();
  const newUser = new User({
    name,
    email,
    address,
    password,
    number,
    citizenship,
  });
  const user = await newUser.save();
  res.send({ message: 'User Created', user });
});

export default handler;
