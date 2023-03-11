import nextConnect from 'next-connect';
import { error } from '../../../../util/apierr';
import db from '../../../../util/mongodb';
import Payment from '../../../../modal/payment-history';

const handler = nextConnect(error);

handler.get(async (req, res) => {
  const { id } = req.query;
  await db.connect();
  const payment = await Payment.findById(id);
  if (payment) {
    res.send({ message: payment });
  } else res.status(500).send({ message: 'Something Went wrong in server' });
});

export default handler;
