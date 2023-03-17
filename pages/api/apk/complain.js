import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import Complain from '../../../modal/complain';

const handler = nextConnect(error);

handler
  .post(async (req, res) => {
    const { device, subject, description } = req.body;
    await db.connect();
    const newComplain = new Complain({ device, subject, description });
    const complain = await newComplain.save();
    res.send(complain);
  })
  .get(async (req, res) => {
    await db.connect();
    const complains = await Complain.find();
    res.send({ complains });
  });

export default handler;
