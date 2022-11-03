import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import AdminUser from '../../../modal/admin';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { email, password } = req.body;
  await db.connect();
  const user = await AdminUser.findOne({ email });
  console.log(user);
  if (user && user.password == password) {
    res.send({ message: true, user });
  } else {
    res.status(401).send({ message: 'Invalid Username or Password' });
  }
});

export default handler;
