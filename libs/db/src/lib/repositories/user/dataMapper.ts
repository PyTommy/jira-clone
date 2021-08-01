import { UserAttributes } from '@jira-clone/shared-types'
import {
  MysqlUserAttributes,
  MysqlUserCreationAttributes,
  MysqlUserUpdationAttributes,
} from '../../models'
import {
  UserCreationAttributes,
  UserUpdationAttributes,
} from '@jira-clone/db-interfaces'

export class UserDataMapper {
  static toUserAttributes(data: MysqlUserAttributes): UserAttributes {
    const { id, name, email, createdAt, updatedAt, deleted, deletedAt } = data
    return {
      id,
      name,
      email,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
      deleted,
      deletedAt: deletedAt?.getTime(),
    }
  }

  static toMysqlUserUpdatingAttributes(
    data: UserUpdationAttributes,
  ): MysqlUserUpdationAttributes {
    const { id, name, email } = data
    return {
      id,
      name,
      email,
    }
  }

  static toMysqlUserCreationAttributs(
    data: UserCreationAttributes,
  ): MysqlUserCreationAttributes {
    const { id, name, email, password_hash } = data
    return {
      id,
      name,
      email,
      password_hash,
    }
  }
}
