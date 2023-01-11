import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  _id: { type: String, required: true }, //email
  otp: { type: Number, required: true },
});

const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema);
export default Otp;
