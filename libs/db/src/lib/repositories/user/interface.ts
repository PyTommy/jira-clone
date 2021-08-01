import { MysqlUserAttributes, MysqlUserCreationAttributes } from '../../models'
import { Modify } from '../../utils/typeUtils'
import { Repo } from '../base.repository'

export type User = Modify<
  MysqlUserAttributes,
  { createdAt: number; updatedAt: number; deletedAt?: number }
>
export type UserCreate = Modify<MysqlUserCreationAttributes, {}>

export interface IUserRepo extends Repo<User, UserCreate> {}
