import bcryptjs from 'bcryptjs';
import mongoose, { Schema, Model, Document } from 'mongoose';
import connectToMongoLocal from '~/configs/db.config';
import { User } from '~/interfaces/user.interface';

export interface UserDocument extends Document, User {
  isValidPassword(newPassword: string): Promise<boolean>;
}

const userSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    collection: 'user',
    timestamps: true,
  },
);

userSchema.pre<UserDocument>('save', async function (next) {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword: string) {
  try {
    const isMatch = await bcryptjs.compare(newPassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

const UserModel: Model<UserDocument> = connectToMongoLocal.model('user', userSchema);

export default UserModel;
