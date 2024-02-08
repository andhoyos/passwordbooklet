import {mongoose, model, models} from 'mongoose';

const keySchema = new mongoose.Schema({
  company: { type: String, required: true },
  accounts: [{ name: String, password: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Key = models.Key || model("Key", keySchema);

export default Key;
