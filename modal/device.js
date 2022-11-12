import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema(
  {
    litre: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const deviceSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_litre: { type: Number, default: 0 },
    datas: [dataSchema],
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.models.Device || mongoose.model('Device', deviceSchema);
export default Device;
