import {mongoose, model, models} from 'mongoose';

const keySchema = new mongoose.Schema({
  company: { type: String, required: true },
  accounts: [{ name: { type: String, required: true },
    password: { type: String, required: true } }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Key = models.Key || model("Key", keySchema);

export default Key;
