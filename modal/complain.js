import mongoose from 'mongoose';

const complainSchema = new mongoose.Schema({
  device: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
});

const Complain =
  mongoose.models.Complain || mongoose.model('Complain', complainSchema);
export default Complain;
