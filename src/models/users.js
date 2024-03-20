import {mongoose, model, models} from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true },
  totpSecret: { type: String }, 
  iv: { type: String},
  twoFactorAuthEnabled: { type: Boolean, default: false } 
});

const User = models.User || model('User', userSchema);

export default User;
