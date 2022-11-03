import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import AdminUser from '../../../modal/admin';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { name, email, password } = req.body;
  await db.connect();
  const newAdmin = new AdminUser({
    name,
    email,
    password,
  });
  const admin = await newAdmin.save();
  res.send({ message: 'New Admin User Created Successfully', admin });
});

export default handler;
