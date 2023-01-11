import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import User from '../../../modal/user';
import Otp from '../../../modal/otp';
import db from '../../../util/mongodb';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { name, address, email, password, number, citizenship, otp } = req.body;
  await db.connect();
  const otpass = await Otp.findById(email);
  if (otpass.otp == otp) {
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
  } else res.status(400).send({ message: 'Invalid otp!' });
});

export default handler;
