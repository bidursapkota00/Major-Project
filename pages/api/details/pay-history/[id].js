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
    const { payments } = payment;
    const groupById = payments.reduce((accumulator, currentValue) => {
      const id = currentValue._id;
      if (!accumulator[id]) {
        accumulator[id] = [];
      }
      accumulator[id].push({
        key: currentValue.createdAt,
        token: currentValue._id,
        date: currentValue.createdAt,
        status: currentValue.status,
        amount: currentValue.amount,
      });
      return accumulator;
    }, {});
    const data = Object.values(groupById);
    res.send({ message: data });
  } else res.send({ message: [] });
});

export default handler;
