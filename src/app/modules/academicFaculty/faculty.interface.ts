import { Model } from 'mongoose';

export interface IFaculty extends Document {
  title: string;
}

export type FacultyModel = Model<IFaculty>;

export interface IsearchParam {
  search: string;
}
