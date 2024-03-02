import {mongoose, model, models} from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, select:false, required: true },
  // image: String,
});


const User = models.User || model('User', userSchema);

export default User;

// import { mongoose, model } from 'mongoose';

// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, select: false, required: true },
//   phoneNumber: { type: String }, 
//   twoFactorAuthEnabled: { type: Boolean, default: false } 
// });

// const User = model('User', userSchema);

// export default User;