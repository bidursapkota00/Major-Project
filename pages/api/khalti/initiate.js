import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import Payment from '../../../modal/payment-history';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { device, status, token, amount } = req.body;
  await db.connect();
  const pay = await Payment.findOneAndUpdate(
    { _id: device },
    { $push: { payments: { _id: token, status, amount } } },
    { upsert: true, new: true }
  );
  res.send(pay);
});

export default handler;
