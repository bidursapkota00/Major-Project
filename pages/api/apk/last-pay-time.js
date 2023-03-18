import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import Payment from '../../../modal/payment-history';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  try {
    const { device } = req.body;
    await db.connect();
    const parent = await Payment.findById(device);
    const confirmedPayments = parent.payments
      .filter((payment) => payment.status === 'Confirmed')
      .sort((a, b) => b.createdAt - a.createdAt); // sort payments by createdAt in descending order
    const latestConfirmedPayment = confirmedPayments[0];
    res.json(latestConfirmedPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default handler;
