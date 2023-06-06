import config from '../../../config';
import ApiError from '../../../errors/errors.apiError';
import { IUser } from './users.interface';
import { User } from './users.model';
import { getIncrementalUserId } from './users.utils';

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  //Generate incremental user id
  const id = await getIncrementalUserId();
  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_student_pass;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create');
  }
  return createdUser;
};

export default { createUserToDB };
