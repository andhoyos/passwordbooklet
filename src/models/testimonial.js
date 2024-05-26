import {mongoose, model, models} from 'mongoose';


const testimonialSchema = new mongoose.Schema({
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String}
}, { timestamps: true });

const Testimonial = models.Testimonial || model("Testimonial", testimonialSchema);

export default Testimonial;