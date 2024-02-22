import {mongoose, model, models} from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  iv: { type: String, required: true }
});

const keySchema = new mongoose.Schema({
  company: { type: String, required: true },
  accounts: [accountSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Key = models.Key || model("Key", keySchema);

export default Key;
