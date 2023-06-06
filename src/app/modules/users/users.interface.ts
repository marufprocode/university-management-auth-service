import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  id: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
