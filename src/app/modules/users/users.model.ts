import { Model, Schema, model } from 'mongoose';
import { IUser } from './users.interface';

type UserModel = Model<IUser, object>;

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, //this settings will create createdAt and updatedAt automatically by mongoose
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
