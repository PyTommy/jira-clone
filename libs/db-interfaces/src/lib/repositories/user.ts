import { UserAttributes } from '@jira-clone/shared-types'
import { Repo } from './baseRepo'

export type UserCreationAttributes = Omit<
  UserAttributes & { password_hash: string },
  'createdAt' | 'updatedAt' | 'deletedAt' | 'deleted'
>
export type UserUpdationAttributes = Omit<
  Partial<UserAttributes> & { id: string },
  'createdAt' | 'updatedAt' | 'deletedAt' | 'deleted'
>

export interface IUserRepo
  extends Repo<
    UserAttributes,
    UserCreationAttributes,
    UserUpdationAttributes
  > {}
