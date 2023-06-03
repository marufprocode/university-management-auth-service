import { User } from './users.model'

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ id: -1 })
    .lean()
  return lastUser?.id
}

export const getIncrementalUserId = async (): Promise<string> => {
  const lastUserId = await findLastUserId()
  const lastNumericId = lastUserId ? parseInt(lastUserId.split('-')[2]) : 0
  const nextNumericId = lastNumericId + 1
  const paddedId = String(nextNumericId).padStart(5, '0')
  const userId = `UM-STD-${paddedId}`
  return userId
}
