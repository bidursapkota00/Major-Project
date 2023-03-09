import mongoose from 'mongoose';

const paySchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    status: { type: String },
    amount: { type: Number },
  },
  {
    timestamps: true,
  }
);

const paymentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  payments: [paySchema],
});

const Payment =
  mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
export default Payment;
