import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stream: { type: String, default: 'NOTHING' },
    total_litre: { type: Number, default: 0 },
    datas: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.models.Device || mongoose.model('Device', deviceSchema);
export default Device;
