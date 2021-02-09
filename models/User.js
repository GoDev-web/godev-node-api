import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const requiredString = {
  type: String,
  required: [true, 'is required!'],
};

const UserSchema = new mongoose.Schema(
  {
    username: { ...requiredString, lowercase: true },
    email: { ...requiredString, lowercase: true },
    password: { ...requiredString },
    bio: String,
    profile_Img: String,
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('user', UserSchema);

export default User;
